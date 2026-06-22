from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database.postgres import Base


class BehaviorLog(Base):
    __tablename__ = "behavior_logs"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.user_id"))

    action = Column(String)

    page = Column(String)

    session_id = Column(String)

    timestamp = Column(DateTime, server_default=func.now())