from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database.postgres import Base


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.user_id"))

    alert_type = Column(String)

    severity = Column(String)

    status = Column(String)

    created_at = Column(DateTime, server_default=func.now())