from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, Field

TransactionType = Literal["TRANSFER", "CARD_PAYMENT", "UPI", "ATM_WITHDRAWAL"]
TransactionStatus = Literal["PENDING", "COMPLETED", "BLOCKED", "REVIEW"]
RiskLevel = Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]


class TransferRequest(BaseModel):
    user_id: str = Field(..., min_length=3, max_length=32)
    beneficiary_account: str = Field(..., min_length=8, max_length=24)
    beneficiary_name: str = Field(..., min_length=2, max_length=100)
    amount: Decimal = Field(..., gt=0, max_digits=12, decimal_places=2)
    currency: str = Field(default="INR", min_length=3, max_length=3)
    transaction_type: TransactionType = "TRANSFER"
    device_id: str = Field(..., min_length=3, max_length=64)
    ip_address: str = Field(..., min_length=7, max_length=45)
    location: str = Field(..., min_length=2, max_length=100)


class TransactionItem(BaseModel):
    transaction_id: str
    user_id: str
    transaction_type: TransactionType
    counterparty: str
    amount: Decimal = Field(..., ge=0)
    currency: str
    status: TransactionStatus
    risk_level: RiskLevel
    risk_score: int = Field(..., ge=0, le=100)
    fraud_signals: list[str]
    created_at: datetime


class TransferResponse(BaseModel):
    success: bool
    message: str
    transaction: TransactionItem


class TransactionListResponse(BaseModel):
    user_id: str
    transactions: list[TransactionItem]
