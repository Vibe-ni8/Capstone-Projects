namespace Darkwolf.AuthService.Solution.Utils.Settings;

public class PasswordSettings
{
    public int MinimumLength { get; set; }
    public int OtpValidDays { get; set; }
    public int OtpValidHours { get; set; }
    public int OtpValidMinutes { get; set; }
    public int OtpValidSeconds { get; set; }
}
