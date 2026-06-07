// device_logs
{
  _id: ObjectId,
  user_id: String,
  device_id: String,
  device_type: String,
  browser: String,
  os: String,
  ip_address: String,
  created_at: Date
}

// behavior_logs
{
  _id: ObjectId,
  user_id: String,
  action: String,
  page: String,
  session_id: String,
  timestamp: Date
}

// location_history
{
  _id: ObjectId,
  user_id: String,
  country: String,
  city: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date
}

// risk_logs
{
  _id: ObjectId,
  user_id: String,
  risk_score: Number,
  risk_level: String,
  reason: String,
  timestamp: Date
}

// alerts
{
  _id: ObjectId,
  user_id: String,
  alert_type: String,
  severity: String,
  status: String,
  created_at: Date
}

// fraud_cases
{
  _id: ObjectId,
  user_id: String,
  case_id: String,
  description: String,
  status: String,
  assigned_to: String,
  created_at: Date
}