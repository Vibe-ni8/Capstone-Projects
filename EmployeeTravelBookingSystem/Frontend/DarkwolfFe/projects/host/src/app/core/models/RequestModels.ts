export type LoginRequest = {
    username: string;
    password: string;
};

export type ForgotPasswordRequest = {
    email: string;
};

export type ResetPasswordRequest = {
    email: string;
    password: string;
    resetToken: string;
};