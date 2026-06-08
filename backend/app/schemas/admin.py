from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

RiskLevel = Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]
UserStatus = Literal["ACTIVE", "BLOCKED", "UNDER_REVIEW"]


class AdminDashboardResponse(BaseModel):
    total_users: int = Field(..., ge=0)
    fraud_attempts: int = Field(..., ge=0)
    blocked_users: int = Field(..., ge=0)
    active_investigations: int = Field(..., ge=0)
    high_risk_logins_today: int = Field(..., ge=0)
    sim_swap_alerts_today: int = Field(..., ge=0)


class AdminUserItem(BaseModel):
    user_id: str
    full_name: str
    email: str
    status: UserStatus
    trust_score: int = Field(..., ge=0, le=100)
    risk_level: RiskLevel
    last_login_at: datetime


class AdminUsersResponse(BaseModel):
    users: list[AdminUserItem]


class UserStatusRequest(BaseModel):
    user_id: str = Field(..., min_length=3, max_length=32)
    reason: str = Field(..., min_length=5, max_length=250)


class UserStatusResponse(BaseModel):
    success: bool
    message: str
    user_id: str
    status: UserStatus
