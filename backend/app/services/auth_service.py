from datetime import datetime, timezone
import hashlib
import hmac
import os

from sqlalchemy import or_
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth import AuthResponse, AuthUser, LoginRequest, RegisterRequest


class AuthService:
    print("AUTH SERVICE LOADED")
    def __init__(self, db: Session) -> None:
        self.db = db

    def register_user(self, data: RegisterRequest) -> AuthResponse:
        existing_user = (
            self.db.query(User)
            .filter(or_(User.email == data.email, User.phone == data.phone))
            .first()
        )
        if existing_user:
            raise ValueError("User with this email or phone already exists")

        fraud_signals = self._registration_signals(data)
        trust_score = 72 if fraud_signals else 94
        risk_level = "MEDIUM" if fraud_signals else "LOW"

        user = User(
            full_name=data.full_name,
            email=str(data.email),
            phone=data.phone,
            password_hash=self._hash_password(data.password),
            is_blocked=False,
            )   
        self.db.add(user)
        try:
            self.db.commit()
        except SQLAlchemyError:
            self.db.rollback()
            raise
        self.db.refresh(user)

        return AuthResponse(
            success=True,
            message="User registered successfully",
            access_token=f"mock_access_token_{user.user_id}",
            user=AuthUser(
                user_id=user.user_id,
                full_name=user.full_name,
                email=user.email,
                trust_score=trust_score,
                risk_level=risk_level,
            ),
            fraud_signals=fraud_signals,
            issued_at=datetime.now(timezone.utc),
        )

    def login_user(self, data: LoginRequest) -> AuthResponse:
        user = self.db.query(User).filter(User.email == data.email).first()
        if not user or not self._verify_password(data.password, user.password_hash):
            raise ValueError("Invalid email or password")

        if user.is_blocked:
            raise ValueError("User account is blocked due to suspected fraud")

        fraud_signals = self._login_signals(data)
        trust_score = 68 if fraud_signals else 92
        risk_level = "MEDIUM" if fraud_signals else "LOW"

        return AuthResponse(
            success=True,
            message="Login successful",
            access_token=f"mock_access_token_{user.user_id}",
            user=AuthUser(
                user_id=user.user_id,
                full_name=user.full_name,
                email=user.email,
                trust_score=trust_score,
                risk_level=risk_level,
            ),
            fraud_signals=fraud_signals,
            issued_at=datetime.now(timezone.utc),
        )

    def _registration_signals(self, data: RegisterRequest) -> list[str]:
        signals: list[str] = []
        if data.location.lower() not in {"mumbai", "delhi", "bengaluru", "bangalore", "pune"}:
            signals.append("registration_location_requires_review")
        if data.national_id.upper().startswith("TEMP"):
            signals.append("temporary_identity_document")
        return signals

    def _login_signals(self, data: LoginRequest) -> list[str]:
        signals: list[str] = []
        if "unknown" in data.device_id.lower():
            signals.append("new_device_login")
        if data.location.lower() not in {"mumbai", "delhi", "bengaluru", "bangalore", "pune"}:
            signals.append("unusual_login_location")
        return signals

    def _hash_password(self, password: str) -> str:
        salt = os.urandom(16)
        iterations = 120_000
        digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)
        return f"pbkdf2_sha256${iterations}${salt.hex()}${digest.hex()}"

    def _verify_password(self, password: str, stored_hash: str) -> bool:
        try:
            algorithm, iterations_text, salt_hex, digest_hex = stored_hash.split("$", 3)
            if algorithm != "pbkdf2_sha256":
                return False
            iterations = int(iterations_text)
            salt = bytes.fromhex(salt_hex)
            expected_digest = bytes.fromhex(digest_hex)
        except (ValueError, TypeError):
            return False

        actual_digest = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode("utf-8"),
            salt,
            iterations,
        )
        return hmac.compare_digest(actual_digest, expected_digest)
