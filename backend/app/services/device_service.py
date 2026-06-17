from datetime import datetime, timezone

from app.schemas.device import DeviceItem, DeviceListResponse, DeviceRegisterRequest, DeviceRegisterResponse


class DeviceService:
    def register_device(self, payload: DeviceRegisterRequest) -> DeviceRegisterResponse:
        anomaly_signals = self._detect_device_signals(payload)
        risk_score = 64 if anomaly_signals else 14
        status = "REVIEW" if anomaly_signals else "TRUSTED"
        risk_level = "MEDIUM" if anomaly_signals else "LOW"

        device = DeviceItem(
            device_id=payload.device_id,
            device_name=payload.device_name,
            device_type=payload.device_type,
            os=payload.os,
            status=status,
            risk_level=risk_level,
            risk_score=risk_score,
            last_seen_location=payload.location,
            last_seen_at=datetime.now(timezone.utc),
            anomaly_signals=anomaly_signals,
        )

        return DeviceRegisterResponse(
            success=True,
            message="Device registered successfully",
            device=device,
        )

    def get_devices(self, user_id: str) -> DeviceListResponse:
        if not user_id.strip():
            raise ValueError("User ID is required")

        return DeviceListResponse(
            user_id=user_id,
            devices=[
                DeviceItem(
                    device_id="DEV001",
                    device_name="iPhone 15",
                    device_type="mobile",
                    os="iOS 18",
                    status="TRUSTED",
                    risk_level="LOW",
                    risk_score=8,
                    last_seen_location="Mumbai",
                    last_seen_at=datetime(2026, 6, 8, 8, 55, tzinfo=timezone.utc),
                    anomaly_signals=[],
                ),
                DeviceItem(
                    device_id="DEV009",
                    device_name="Android Emulator",
                    device_type="mobile",
                    os="Android 15",
                    status="REVIEW",
                    risk_level="HIGH",
                    risk_score=79,
                    last_seen_location="Unknown",
                    last_seen_at=datetime(2026, 6, 8, 4, 20, tzinfo=timezone.utc),
                    anomaly_signals=["emulator_detected", "impossible_travel_pattern"],
                ),
            ],
        )

    def _detect_device_signals(self, payload: DeviceRegisterRequest) -> list[str]:
        signals: list[str] = []
        if "emulator" in payload.device_name.lower():
            signals.append("emulator_detected")
        if payload.location.lower() == "unknown":
            signals.append("unknown_location")
        if payload.sim_operator.lower() in {"unknown", "recently_changed"}:
            signals.append("possible_sim_swap")
        return signals
