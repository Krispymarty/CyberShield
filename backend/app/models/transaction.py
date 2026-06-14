from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database.postgres import Base


class Transaction(Base):
    __tablename__ = "transactions"

    transaction_id = Column(Integer, primary_key=True, index=True)

    account_id = Column(Integer, ForeignKey("accounts.account_id"))

    amount = Column(Numeric(15, 2))

    transaction_type = Column(String(20))

    receiver_account_id = Column(Integer)

    status = Column(String(20))

    transaction_time = Column(DateTime, server_default=func.now())