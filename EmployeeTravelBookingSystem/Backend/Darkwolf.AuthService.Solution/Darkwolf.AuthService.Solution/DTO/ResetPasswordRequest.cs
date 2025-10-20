namespace Darkwolf.AuthService.Solution.DTO;

public class ResetPasswordRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string ResetToken { get; set; } = string.Empty;
}
