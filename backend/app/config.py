from dotenv import load_dotenv
import os

load_dotenv()

print("POSTGRES_URL =", os.getenv("POSTGRES_URL"))

POSTGRES_URL = os.getenv("POSTGRES_URL")