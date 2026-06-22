from datetime import datetime, timezone
from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.schemas.alert import (
    AlertItem,
    AlertListResponse,
)


class AlertService:
    def __init__(self, db: Session):
        self.db = db

    def get_alerts(
        self,
        user_id: str
    ) -> AlertListResponse:

        if not user_id.strip():
            raise ValueError(
                "User ID is required"
            )

        docs = (
            self.db.query(Alert)
            .filter(Alert.user_id == user_id)
            .order_by(Alert.created_at.desc())
            .all()
        )

        alerts = []

        for doc in docs:
            alerts.append(
                AlertItem(
                    alert_id=str(doc.id),
                    user_id=str(doc.user_id),
                    alert_type=doc.alert_type,
                    severity=doc.severity,
                    status=doc.status,
                    title="Security Alert",
                    description="Suspicious activity detected",
                    risk_score=0,
                    recommended_action="Review activity",
                    created_at=(
                        doc.created_at
                        or datetime.now(
                            timezone.utc
                        )
                    ),
                )
            )

        return AlertListResponse(
            user_id=user_id,
            alerts=alerts,
        )