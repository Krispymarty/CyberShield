from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import Boolean

from app.database.postgres import Base


class User(Base):

    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True)

    full_name = Column(String)

    email = Column(String, unique=True)

    phone = Column(String, unique=True)

    password_hash = Column(String)

    is_blocked = Column(Boolean, default=False)