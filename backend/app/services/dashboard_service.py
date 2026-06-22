from datetime import datetime, timezone
from decimal import Decimal

from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.models.device_log import DeviceLog
from app.models.risk_log import RiskLog

from app.schemas.dashboard import (
    DashboardResponse,
    DashboardTransaction,
)


class DashboardService:
    def __init__(self, db: Session):
        self.db = db

    def get_user_dashboard(
        self,
        user_id: str
    ) -> DashboardResponse:

        if not user_id.strip():
            raise ValueError(
                "User ID is required"
            )

        active_alerts = (
            self.db.query(Alert)
            .filter(
                Alert.user_id == user_id,
                Alert.status == "OPEN",
            )
            .count()
        )

        trusted_devices = (
            self.db.query(DeviceLog)
            .filter(
                DeviceLog.user_id == user_id
            )
            .count()
        )

        latest_risk = (
            self.db.query(RiskLog)
            .filter(
                RiskLog.user_id == user_id
            )
            .order_by(
                RiskLog.timestamp.desc()
            )
            .first()
        )

        risk_score = (
            latest_risk.risk_score
            if latest_risk
            else 8
        )

        risk_level = (
            latest_risk.risk_level
            if latest_risk
            else "LOW"
        )

        trust_score = max(
            0,
            min(
                100,
                100 - risk_score,
            ),
        )

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
                    amount=Decimal(
                        "3499.00"
                    ),
                    currency="INR",
                    status="COMPLETED",
                    risk_score=12,
                    created_at=datetime(
                        2026,
                        6,
                        8,
                        9,
                        15,
                        tzinfo=timezone.utc,
                    ),
                )
            ],
        )