from fastapi import APIRouter

from app.schemas.auth import (
    RegisterRequest,
    LoginRequest
)

from app.services.auth_service import AuthService

router = APIRouter()


@router.post("/register")
async def register(payload: RegisterRequest):

    return AuthService.register_user(payload)


@router.post("/login")
async def login(payload: LoginRequest):

    return AuthService.login_user(payload)