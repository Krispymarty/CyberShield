from datetime import datetime, timezone
from decimal import Decimal

from app.schemas.dashboard import DashboardResponse, DashboardTransaction


class DashboardService:
    def get_user_dashboard(self, user_id: str) -> DashboardResponse:
        if not user_id.strip():
            raise ValueError("User ID is required")

        return DashboardResponse(
            user_id=user_id,
            balance=Decimal("50000.00"),
            currency="INR",
            trust_score=92,
            risk_level="LOW",
            active_alerts=1,
            trusted_devices=2,
            recent_transactions=[
                DashboardTransaction(
                    transaction_id="TXN001",
                    merchant="Reliance Digital",
                    amount=Decimal("3499.00"),
                    currency="INR",
                    status="COMPLETED",
                    risk_score=12,
                    created_at=datetime(2026, 6, 8, 9, 15, tzinfo=timezone.utc),
                ),
                DashboardTransaction(
                    transaction_id="TXN002",
                    merchant="ATM Withdrawal",
                    amount=Decimal("10000.00"),
                    currency="INR",
                    status="REVIEW",
                    risk_score=61,
                    created_at=datetime(2026, 6, 8, 7, 42, tzinfo=timezone.utc),
                ),
            ],
        )
