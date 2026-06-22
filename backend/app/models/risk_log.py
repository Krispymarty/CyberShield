from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database.postgres import Base


class RiskLog(Base):
    __tablename__ = "risk_logs"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.user_id"))

    risk_score = Column(Integer)

    risk_level = Column(String)

    reason = Column(String)

    timestamp = Column(DateTime, server_default=func.now())