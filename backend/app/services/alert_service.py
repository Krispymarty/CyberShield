from datetime import datetime, timezone

from app.database.mongodb import get_collection
from app.schemas.alert import AlertItem, AlertListResponse


class AlertService:
    def get_alerts(self, user_id: str) -> AlertListResponse:
        if not user_id.strip():
            raise ValueError("User ID is required")

        collection = get_collection("alerts")

        docs = list(
            collection.find({"user_id": user_id}).sort("created_at", -1)
        )

        alerts = []

        for doc in docs:
            doc.pop("_id", None)

            alerts.append(
                AlertItem(
                    alert_id=doc.get("alert_id", ""),
                    user_id=doc.get("user_id", user_id),
                    alert_type=doc.get("alert_type", "UNKNOWN"),
                    severity=doc.get("severity", "LOW"),
                    status=doc.get("status", "OPEN"),
                    title=doc.get("title", ""),
                    description=doc.get("description", ""),
                    risk_score=doc.get("risk_score", 0),
                    recommended_action=doc.get(
                        "recommended_action",
                        "Review activity"
                    ),
                    created_at=doc.get("created_at")
                    or datetime.now(timezone.utc),
                )
            )

        return AlertListResponse(
            user_id=user_id,
            alerts=alerts,
        )
