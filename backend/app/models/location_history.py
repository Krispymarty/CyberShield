from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database.postgres import Base


class LocationHistory(Base):
    __tablename__ = "location_history"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.user_id"))

    country = Column(String)

    city = Column(String)

    latitude = Column(Float)

    longitude = Column(Float)

    timestamp = Column(DateTime, server_default=func.now())