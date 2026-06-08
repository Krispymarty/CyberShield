from datetime import datetime, timezone
from decimal import Decimal

from app.schemas.transactions import (
    TransactionItem,
    TransactionListResponse,
    TransferRequest,
    TransferResponse,
)


class TransactionService:
    def transfer_money(self, payload: TransferRequest) -> TransferResponse:
        fraud_signals = self._detect_transfer_signals(payload)
        risk_score = 78 if fraud_signals else 18
        status = "REVIEW" if fraud_signals else "COMPLETED"
        risk_level = "HIGH" if risk_score >= 75 else "LOW"

        if payload.amount > Decimal("250000.00"):
            raise ValueError("Transfer amount exceeds mock daily limit")

        transaction = TransactionItem(
            transaction_id="TXN9001",
            user_id=payload.user_id,
            transaction_type=payload.transaction_type,
            counterparty=payload.beneficiary_name,
            amount=payload.amount,
            currency=payload.currency,
            status=status,
            risk_level=risk_level,
            risk_score=risk_score,
            fraud_signals=fraud_signals,
            created_at=datetime.now(timezone.utc),
        )

        return TransferResponse(
            success=True,
            message="Transfer accepted for processing",
            transaction=transaction,
        )

    def get_transactions(self, user_id: str) -> TransactionListResponse:
        if not user_id.strip():
            raise ValueError("User ID is required")

        return TransactionListResponse(
            user_id=user_id,
            transactions=[
                TransactionItem(
                    transaction_id="TXN001",
                    user_id=user_id,
                    transaction_type="CARD_PAYMENT",
                    counterparty="Amazon India",
                    amount=Decimal("2499.00"),
                    currency="INR",
                    status="COMPLETED",
                    risk_level="LOW",
                    risk_score=9,
                    fraud_signals=[],
                    created_at=datetime(2026, 6, 7, 18, 5, tzinfo=timezone.utc),
                ),
                TransactionItem(
                    transaction_id="TXN002",
                    user_id=user_id,
                    transaction_type="UPI",
                    counterparty="Unknown Beneficiary",
                    amount=Decimal("49000.00"),
                    currency="INR",
                    status="REVIEW",
                    risk_level="HIGH",
                    risk_score=82,
                    fraud_signals=["new_beneficiary", "velocity_threshold_exceeded"],
                    created_at=datetime(2026, 6, 8, 6, 30, tzinfo=timezone.utc),
                ),
            ],
        )

    def _detect_transfer_signals(self, payload: TransferRequest) -> list[str]:
        signals: list[str] = []
        if payload.amount >= Decimal("50000.00"):
            signals.append("high_value_transfer")
        if "unknown" in payload.device_id.lower():
            signals.append("unrecognized_device")
        if payload.location.lower() not in {"mumbai", "delhi", "bengaluru", "bangalore", "pune"}:
            signals.append("location_anomaly")
        return signals
