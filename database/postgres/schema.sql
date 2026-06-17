CREATE TABLE users (
    user_id VARCHAR(20) PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    phone VARCHAR(15) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    dob DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE accounts (
    account_id SERIAL PRIMARY KEY,

    user_id VARCHAR(20) REFERENCES users(user_id),

    account_number VARCHAR(20) UNIQUE NOT NULL,

    account_type VARCHAR(20),

    balance NUMERIC(15,2) DEFAULT 0,

    status VARCHAR(20) DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE beneficiaries (
    beneficiary_id SERIAL PRIMARY KEY,

    user_id VARCHAR(20) REFERENCES users(user_id),

    beneficiary_name VARCHAR(100),

    beneficiary_account VARCHAR(20),

    bank_name VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE auth_status (
    auth_id SERIAL PRIMARY KEY,

    user_id VARCHAR(20) REFERENCES users(user_id),

    otp_verified BOOLEAN DEFAULT FALSE,

    biometric_verified BOOLEAN DEFAULT FALSE,

    passkey_verified BOOLEAN DEFAULT FALSE,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE login_history (
    login_id SERIAL PRIMARY KEY,

    user_id VARCHAR(20) REFERENCES users(user_id),

    ip_address VARCHAR(50),

    device_name VARCHAR(100),

    login_status VARCHAR(20),

    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,

    account_id INTEGER REFERENCES accounts(account_id),

    amount NUMERIC(15,2),

    transaction_type VARCHAR(20),

    receiver_account_id INTEGER,

    status VARCHAR(20),

    transaction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);