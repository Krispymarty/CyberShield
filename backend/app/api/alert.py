from fastapi import APIRouter, Depends, HTTPException, status

from app.schemas.alert import AlertListResponse
from app.services.alert_service import AlertService

router = APIRouter()


def get_alert_service() -> AlertService:
    return AlertService()


@router.get("/{user_id}", response_model=AlertListResponse)
async def get_alerts(
    user_id: str,
    service: AlertService = Depends(get_alert_service),
) -> AlertListResponse:
    try:
        return service.get_alerts(user_id)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
