namespace Darkwolf.AuthService.Solution.Utils.Common;

public static class LogMessage
{
    public const string StartMethod = "Start - {Method}";
    public const string EndMethod = "End - {Method}";
    public const string UserNotFoundOnLogin = "Login failed: user not found: {Username}";
    public const string InvalidPassword = "Login failed: invalid password for {EmpId}";
    public const string UserNotFoundOnReset = "Reset failed: user not found: {Email}";
    public const string OtpNotGeneratedOrInvalid = "Reset failed: OTP not generated or invalid";
    public const string OtpExpired = "Reset failed: OTP expired";
}

public static class ExceptionMessage
{
    public const string JwtNotConfigured = "JWT settings not configured";
    public const string ConnectionStringNotConfigured = "ConnectionString not configured";
}

public static class ResponseMessage
{
    public const string InvalidCredentials = "Invalid credentials";
    public const string LoginCredentialsRequired = "Username and password are required";
    public const string EmailRequired = "Email is required";
    public const string EmailNotRegistered = "Email not registered";
    public const string OtpSendToEmail = "Otp send to the email:{0}";
    public const string PasswordRequired = "Password is Required";
    public const string PasswordResetSuccess = "Password reset successfully";
    public const string OtpForReset = "OTP for reset password : {0}";
    public const string OtpRequired = "OTP is required";
    public const string InvalidUser = "Invalid user";
    public const string InvalidOtp = "Invalid OTP";
}

public static class FieldName
{
    public const string Password = "Password";
    public const string Username = "Username";
    public const string Email = "Email";
    public const string Role = "Role";
}

public static class AppSettingKey
{
    public const string DefaultConnection = "DefaultConnection";
    public const string JwtSettings = "JwtSettings";
    public const string PasswordSettings = "PasswordSettings";
}