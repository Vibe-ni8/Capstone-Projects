namespace Darkwolf.AuthService.Solution.Utils.Settings;

public class PasswordSettings
{
    public int MinimumLength { get; set; }
    public int ResetTokenValidDays { get; set; }
    public int ResetTokenValidHours { get; set; }
    public int ResetTokenValidMinutes { get; set; }
    public int ResetTokenValidSeconds { get; set; } = 30;
    public int ResetTokenLength { get; set; } = 4;
}
