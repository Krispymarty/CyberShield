from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

AlertType = Literal[
    "IMPERSONATED_REGISTRATION",
    "ACCOUNT_TAKEOVER",
    "SIM_SWAP",
    "LOCATION_ANOMALY",
    "DEVICE_ANOMALY",
    "BEHAVIORAL_ANOMALY",
]
AlertSeverity = Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]
AlertStatus = Literal["OPEN", "ACKNOWLEDGED", "RESOLVED", "ESCALATED"]


class AlertItem(BaseModel):
    alert_id: str
    user_id: str
    alert_type: AlertType
    severity: AlertSeverity
    status: AlertStatus
    title: str
    description: str
    risk_score: int = Field(..., ge=0, le=100)
    recommended_action: str
    created_at: datetime


class AlertListResponse(BaseModel):
    user_id: str
    alerts: list[AlertItem]
