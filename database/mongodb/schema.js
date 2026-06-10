const mongoose = require("mongoose");

const deviceLogSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  device_id: String,
  device_type: String,
  browser: String,
  os: String,
  ip_address: String,
  created_at: { type: Date, default: Date.now }
});

const behaviorLogSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  action: String,
  page: String,
  session_id: String,
  timestamp: { type: Date, default: Date.now }
});

const locationHistorySchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  country: String,
  city: String,
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now }
});

const riskLogSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  risk_score: Number,
  risk_level: String,
  reason: String,
  timestamp: { type: Date, default: Date.now }
});

const alertSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  alert_type: String,
  severity: String,
  status: { type: String, default: "OPEN" },
  created_at: { type: Date, default: Date.now }
});

const fraudCaseSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  case_id: String,
  description: String,
  status: { type: String, default: "OPEN" },
  assigned_to: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = {
  DeviceLog: mongoose.model("DeviceLog", deviceLogSchema, "device_logs"),
  BehaviorLog: mongoose.model("BehaviorLog", behaviorLogSchema, "behavior_logs"),
  LocationHistory: mongoose.model("LocationHistory", locationHistorySchema, "location_history"),
  RiskLog: mongoose.model("RiskLog", riskLogSchema, "risk_logs"),
  Alert: mongoose.model("Alert", alertSchema, "alerts"),
  FraudCase: mongoose.model("FraudCase", fraudCaseSchema, "fraud_cases")
};