db.device_logs.insertOne({
  user_id: "USR001",
  device_id: "DEV001",
  device_type: "Mobile",
  browser: "Chrome",
  os: "iOS",
  ip_address: "192.168.1.1",
  created_at: new Date()
});