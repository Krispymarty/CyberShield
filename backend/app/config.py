from dotenv import load_dotenv
import os

load_dotenv()

POSTGRES_URL = os.getenv("POSTGRES_URL") or os.getenv("DATABASE_URL")
MONGO_URL = os.getenv("MONGO_URL") or os.getenv("MONGODB_URL")
JWT_SECRET = os.getenv("JWT_SECRET")
