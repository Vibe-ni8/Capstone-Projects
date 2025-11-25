export interface LoginRequest {
    username: string;
    password: string;
};

export interface ForgotPasswordRequest {
    email: string;
};

export interface ResetPasswordRequest {
    email: string;
    password: string;
    resetToken: string;
};