from fastapi import APIRouter, Depends, HTTPException, status

from app.schemas.device import DeviceListResponse, DeviceRegisterRequest, DeviceRegisterResponse
from app.services.device_service import DeviceService

router = APIRouter()


def get_device_service() -> DeviceService:
    return DeviceService()


@router.post("/register", response_model=DeviceRegisterResponse, status_code=status.HTTP_201_CREATED)
async def register_device(
    payload: DeviceRegisterRequest,
    service: DeviceService = Depends(get_device_service),
) -> DeviceRegisterResponse:
    try:
        return service.register_device(payload)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.get("/{user_id}", response_model=DeviceListResponse)
async def get_devices(
    user_id: str,
    service: DeviceService = Depends(get_device_service),
) -> DeviceListResponse:
    try:
        return service.get_devices(user_id)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
