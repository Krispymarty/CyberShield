"""
Sentinel AI Backend Application

Main entry point for the FastAPI application.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.dashboard import router as dashboard_router

# from app.database.postgres import engine  For postgresql, after changing the database URL, run this line once to create the tables in the database. 
from app.models.user import User
from app.database.postgres import Base

from app.api.transactions import router as transaction_router
from app.api.device import router as device_router
from app.api.alert import router as alert_router
from app.api.admin import router as admin_router




app = FastAPI(title="Sentinel AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"]
)


@app.get("/health")
async def health_check():
    return {"status": "healthy"}

app.include_router(
    dashboard_router,
    prefix="/api/dashboard",
    tags=["Dashboard"]
)

app.include_router(
    transaction_router,
    prefix="/api/transactions",
    tags=["Transactions"]
)

app.include_router(
    device_router,
    prefix="/api/device",
    tags=["Devices"]
)

app.include_router(
    alert_router,
    prefix="/api/alerts",
    tags=["Alerts"]
)

app.include_router(
    admin_router,
    prefix="/api/admin",
    tags=["Admin"]
)

# Base.metadata.create_all(bind=engine)   For postgresql, after changing the database URL, run this line once to create the tables in the database. 