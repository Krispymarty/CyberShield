from datetime import datetime, timezone

from app.schemas.alert import AlertItem, AlertListResponse


class AlertService:
    def get_alerts(self, user_id: str) -> AlertListResponse:
        if not user_id.strip():
            raise ValueError("User ID is required")

        return AlertListResponse(
            user_id=user_id,
            alerts=[
                AlertItem(
                    alert_id="ALT001",
                    user_id=user_id,
                    alert_type="LOCATION_ANOMALY",
                    severity="HIGH",
                    status="OPEN",
                    title="Impossible travel detected",
                    description="Login observed from two distant cities within a short time window.",
                    risk_score=84,
                    recommended_action="Require step-up verification and review recent transfers.",
                    created_at=datetime(2026, 6, 8, 5, 40, tzinfo=timezone.utc),
                ),
                AlertItem(
                    alert_id="ALT002",
                    user_id=user_id,
                    alert_type="SIM_SWAP",
                    severity="MEDIUM",
                    status="ACKNOWLEDGED",
                    title="SIM change pattern matched",
                    description="Mobile operator metadata indicates a recent SIM profile change.",
                    risk_score=67,
                    recommended_action="Temporarily restrict high-value transfers.",
                    created_at=datetime(2026, 6, 7, 19, 10, tzinfo=timezone.utc),
                ),
            ],
        )
