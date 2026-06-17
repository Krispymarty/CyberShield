from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, Field

RiskLevel = Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]
TransactionStatus = Literal["PENDING", "COMPLETED", "BLOCKED", "REVIEW"]


class DashboardTransaction(BaseModel):
    transaction_id: str
    merchant: str
    amount: Decimal = Field(..., ge=0)
    currency: str = Field(default="INR", min_length=3, max_length=3)
    status: TransactionStatus
    risk_score: int = Field(..., ge=0, le=100)
    created_at: datetime


class DashboardResponse(BaseModel):
    user_id: str
    balance: Decimal = Field(..., ge=0)
    currency: str = Field(default="INR", min_length=3, max_length=3)
    trust_score: int = Field(..., ge=0, le=100)
    risk_level: RiskLevel
    active_alerts: int = Field(..., ge=0)
    trusted_devices: int = Field(..., ge=0)
    recent_transactions: list[DashboardTransaction]
