from datetime import datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field


RiskLevel = Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]


class RegisterRequest(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15, pattern=r"^\+?[0-9]{10,15}$")
    password: str = Field(..., min_length=8, max_length=128)
    national_id: str = Field(..., min_length=6, max_length=32)
    device_id: str = Field(..., min_length=3, max_length=64)
    ip_address: str = Field(..., min_length=7, max_length=45)
    location: str = Field(..., min_length=2, max_length=100)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)
    device_id: str = Field(..., min_length=3, max_length=64)
    ip_address: str = Field(..., min_length=7, max_length=45)
    location: str = Field(..., min_length=2, max_length=100)


class AuthUser(BaseModel):
    user_id: int
    full_name: str
    email: EmailStr
    trust_score: int = Field(..., ge=0, le=100)
    risk_level: RiskLevel


class AuthResponse(BaseModel):
    success: bool
    message: str
    access_token: str
    token_type: Literal["bearer"] = "bearer"
    user: AuthUser
    fraud_signals: list[str]
    issued_at: datetime
