namespace Darkwolf.AuthService.Solution.DTO;

public class LoginRequest
{
    /// <summary>
    /// Accept either emp_id or emp_email here
    /// </summary>
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}