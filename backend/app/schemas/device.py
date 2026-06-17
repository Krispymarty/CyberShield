from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

DeviceStatus = Literal["TRUSTED", "NEW", "BLOCKED", "REVIEW"]
RiskLevel = Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]


class DeviceRegisterRequest(BaseModel):
    user_id: str = Field(..., min_length=3, max_length=32)
    device_id: str = Field(..., min_length=3, max_length=64)
    device_name: str = Field(..., min_length=2, max_length=100)
    device_type: str = Field(..., min_length=2, max_length=50)
    os: str = Field(..., min_length=2, max_length=50)
    app_version: str = Field(..., min_length=1, max_length=20)
    ip_address: str = Field(..., min_length=7, max_length=45)
    location: str = Field(..., min_length=2, max_length=100)
    sim_operator: str = Field(..., min_length=2, max_length=50)


class DeviceItem(BaseModel):
    device_id: str
    device_name: str
    device_type: str
    os: str
    status: DeviceStatus
    risk_level: RiskLevel
    risk_score: int = Field(..., ge=0, le=100)
    last_seen_location: str
    last_seen_at: datetime
    anomaly_signals: list[str]


class DeviceRegisterResponse(BaseModel):
    success: bool
    message: str
    device: DeviceItem


class DeviceListResponse(BaseModel):
    user_id: str
    devices: list[DeviceItem]
