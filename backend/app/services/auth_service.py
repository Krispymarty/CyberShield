class AuthService:

    @staticmethod
    def register_user(data):
        return {
            "success": True,
            "message": "User registered successfully"
        }

    @staticmethod
    def login_user(data):
        return {
            "success": True,
            "message": "Login successful"
        }