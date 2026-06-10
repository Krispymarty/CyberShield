from datetime import datetime, timezone

from app.database.mongodb import get_collection
from app.schemas.device import (
    DeviceItem,
    DeviceListResponse,
    DeviceRegisterRequest,
    DeviceRegisterResponse,
)
class DeviceService:
    def register_device(self, payload: DeviceRegisterRequest) -> DeviceRegisterResponse:
        anomaly_signals = self._detect_device_signals(payload)
        risk_score = 64 if anomaly_signals else 14
        status = "REVIEW" if anomaly_signals else "TRUSTED"
        risk_level = "MEDIUM" if anomaly_signals else "LOW"

        device_doc = {
            "user_id": payload.user_id,
            "device_id": payload.device_id,
            "device_name": payload.device_name,
            "device_type": payload.device_type,
            "os": payload.os,
            "status": status,
            "risk_level": risk_level,
            "risk_score": risk_score,
            "last_seen_location": payload.location,
            "last_seen_at": datetime.now(timezone.utc),
            "anomaly_signals": anomaly_signals,
        }

        get_collection("device_logs").insert_one(device_doc)

        device = DeviceItem(**device_doc)

        return DeviceRegisterResponse(
            success=True,
            message="Device registered successfully",
            device=device,
        )

    def get_devices(self, user_id: str) -> DeviceListResponse:
        if not user_id.strip():
            raise ValueError("User ID is required")

        collection = get_collection("device_logs")

        docs = list(collection.find({"user_id": user_id}).sort("last_seen_at", -1))

        devices = []
        for doc in docs:
            doc.pop("_id", None)

            devices.append(
                DeviceItem(
                    device_id=doc.get("device_id", ""),
                    device_name=doc.get("device_name", doc.get("device_type", "Unknown Device")),
                    device_type=doc.get("device_type", "unknown"),
                    os=doc.get("os", "unknown"),
                    status=doc.get("status", "TRUSTED"),
                    risk_level=doc.get("risk_level", "LOW"),
                    risk_score=doc.get("risk_score", 0),
                    last_seen_location=doc.get("last_seen_location", "Unknown"),
                    last_seen_at=doc.get("last_seen_at") or doc.get("created_at") or datetime.now(timezone.utc),
                    anomaly_signals=doc.get("anomaly_signals", []),
                )
            )

        return DeviceListResponse(user_id=user_id, devices=devices)

    def _detect_device_signals(self, payload: DeviceRegisterRequest) -> list[str]:
        signals: list[str] = []

        if "emulator" in payload.device_name.lower():
            signals.append("emulator_detected")

        if payload.location.lower() == "unknown":
            signals.append("unknown_location")

        if payload.sim_operator.lower() in {"unknown", "recently_changed"}:
            signals.append("possible_sim_swap")

        return signals