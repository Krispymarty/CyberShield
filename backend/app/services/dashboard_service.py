from datetime import datetime, timezone
from decimal import Decimal

from app.database.mongodb import get_collection
from app.schemas.dashboard import DashboardResponse, DashboardTransaction


class DashboardService:
    def get_user_dashboard(self, user_id: str) -> DashboardResponse:
        if not user_id.strip():
            raise ValueError("User ID is required")

        alerts = get_collection("alerts")
        devices = get_collection("device_logs")
        risk_logs = get_collection("risk_logs")

        active_alerts = alerts.count_documents({
            "user_id": user_id,
            "status": "OPEN",
        })

        trusted_devices = devices.count_documents({
            "user_id": user_id,
            "status": "TRUSTED",
        })

        latest_risk = risk_logs.find_one(
            {"user_id": user_id},
            sort=[("timestamp", -1)],
        )

        risk_score = latest_risk.get("risk_score", 8) if latest_risk else 8
        risk_level = latest_risk.get("risk_level", "LOW") if latest_risk else "LOW"

        trust_score = max(0, min(100, 100 - risk_score))

        return DashboardResponse(
            user_id=user_id,
            balance=Decimal("50000.00"),
            currency="INR",
            trust_score=trust_score,
            risk_level=risk_level,
            active_alerts=active_alerts,
            trusted_devices=trusted_devices,
            recent_transactions=[
                DashboardTransaction(
                    transaction_id="TXN001",
                    merchant="Reliance Digital",
                    amount=Decimal("3499.00"),
                    currency="INR",
                    status="COMPLETED",
                    risk_score=12,
                    created_at=datetime(2026, 6, 8, 9, 15, tzinfo=timezone.utc),
                )
            ],
        )