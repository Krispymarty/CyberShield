from fastapi import APIRouter, Depends, HTTPException, status

from app.schemas.admin import (
    AdminDashboardResponse,
    AdminUsersResponse,
    UserStatusRequest,
    UserStatusResponse,
)
from app.services.admin_service import AdminService

router = APIRouter()


def get_admin_service() -> AdminService:
    return AdminService()


@router.get("/dashboard", response_model=AdminDashboardResponse)
async def admin_dashboard(
    service: AdminService = Depends(get_admin_service),
) -> AdminDashboardResponse:
    return service.get_dashboard()


@router.get("/users", response_model=AdminUsersResponse)
async def users(
    service: AdminService = Depends(get_admin_service),
) -> AdminUsersResponse:
    return service.get_users()


@router.post("/block-user", response_model=UserStatusResponse)
async def block_user(
    payload: UserStatusRequest,
    service: AdminService = Depends(get_admin_service),
) -> UserStatusResponse:
    try:
        return service.block_user(payload)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.post("/unblock-user", response_model=UserStatusResponse)
async def unblock_user(
    payload: UserStatusRequest,
    service: AdminService = Depends(get_admin_service),
) -> UserStatusResponse:
    try:
        return service.unblock_user(payload)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
