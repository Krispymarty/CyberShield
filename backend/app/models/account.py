from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.database.postgres import Base


class Account(Base):
    __tablename__ = "accounts"

    account_id = Column(Integer, primary_key=True, index=True)

    user_id = Column(String, ForeignKey("users.user_id"))

    account_number = Column(String(20), unique=True, nullable=False)

    account_type = Column(String(20))

    balance = Column(Numeric(15, 2), default=0)

    status = Column(String(20), default="ACTIVE")

    created_at = Column(DateTime, server_default=func.now())
    