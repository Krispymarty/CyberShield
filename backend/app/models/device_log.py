from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database.postgres import Base


class DeviceLog(Base):
    __tablename__ = "device_logs"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.user_id"))

    device_id = Column(String)

    device_type = Column(String)

    browser = Column(String)

    os = Column(String)

    ip_address = Column(String)

    created_at = Column(DateTime, server_default=func.now())