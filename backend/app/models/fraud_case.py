from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database.postgres import Base


class FraudCase(Base):
    __tablename__ = "fraud_cases"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.user_id"))

    case_id = Column(String)

    description = Column(String)

    status = Column(String)

    assigned_to = Column(String)

    created_at = Column(DateTime, server_default=func.now())