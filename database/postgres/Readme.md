# CyberShield PostgreSQL Database

## Tables

### users

Stores user information.

Columns:

- user_id
- full_name
- email
- phone
- password_hash
- dob

---

### accounts

Stores bank accounts.

Columns:

- account_id
- user_id
- account_number
- account_type
- balance

---

### transactions

Stores money transfers.

Columns:

- transaction_id
- account_id
- amount
- transaction_type
- receiver_account_id
- status

---

### beneficiaries

Stores saved receivers.

---

### auth_status

Stores authentication status.

- OTP
- Biometric
- Passkey

---

### login_history

Stores login events.

- IP Address
- Device Name
- Login Status
- Login Time

---

## Relationships

users -> accounts

accounts -> transactions

users -> beneficiaries

users -> auth_status

users -> login_history