INSERT INTO users
(
full_name,
email,
phone,
password_hash,
dob
)
VALUES
(
'xyz',
'xyz@gmail.com',
'9876543210',
'hashedpassword',
'2004-01-01'
);

INSERT INTO accounts
(
user_id,
account_number,
account_type,
balance
)
VALUES
(
1,
'1234567890',
'SAVINGS',
50000
);