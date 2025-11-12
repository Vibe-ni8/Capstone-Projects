using System.Text;
using Darkwolf.AuthService.Solution.Data.Interface;
using Darkwolf.AuthService.Solution.DTO;
using Darkwolf.AuthService.Solution.Utils.Common;
using Darkwolf.AuthService.Solution.Utils.Settings;
using Darkwolf.Shared.Common;
using Darkwolf.Shared.Infrastructure.Interface;
using Darkwolf.Shared.Logging.Interface;
using Microsoft.Extensions.Options;

namespace Darkwolf.AuthService.Solution.Service;

public class PasswordService
{
    private readonly IEmployeeRepository _employeeRepository;
    private readonly IDarkwolfEmailService _emailService;
    private readonly PasswordSettings _passwordSettings;
    private readonly ILoggerManager<PasswordService> _logger;

    public PasswordService(IEmployeeRepository employeeRepository, IOptions<PasswordSettings> options,
        IDarkwolfEmailService emailService, ILoggerManager<PasswordService> logger)
    {
        _employeeRepository = employeeRepository;
        _emailService = emailService;
        _passwordSettings = options.Value;
        _logger = logger;
    }

    public async Task<string?> Forgot(ForgotPasswordRequest request)
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(Forgot));

        var user = await _employeeRepository.FindByEmailAsync(request.Email);

        if (user == null)
        {
            _logger.LogWarn(LogMessage.UserNotFoundOnLogin, request.Email);
            return null;
        }

        var resetToken = GenerateResetToken(_passwordSettings.ResetTokenLength);
        var tokenGeneratedDate = DateTime.Now;

        // save token and token issued date in db
        await _employeeRepository.SetResetToken(user, resetToken, tokenGeneratedDate);

        // calculate expire date
        var tokenExpireDate = tokenGeneratedDate
            .AddDays(_passwordSettings.ResetTokenValidDays)
            .AddHours(_passwordSettings.ResetTokenValidHours)
            .AddMinutes(_passwordSettings.ResetTokenValidMinutes)
            .AddSeconds(_passwordSettings.ResetTokenValidSeconds);

        // send the reset token to the user via email
        await _emailService.SendEmailAsync(EmailAddress.NoReplyDarkwolf, EmailAddress.DisplayName, request.Email, GetString("subject"), 
            string.Format(GetString("body"), user.EmployeeName, resetToken, tokenExpireDate, "SecretVault"));

        // log reset token
        _logger.LogInfo(LogMessage.ResetTokenLog, resetToken);

        _logger.LogInfo(LogMessage.EndMethod, nameof(Forgot));
        return resetToken;
    }

    private static string GenerateResetToken(int length)
    {
        var random = new Random();
        var otp = new StringBuilder();

        for (int i = 0; i < length; i++)
            otp.Append(random.Next(0, 10)); // digits 0–9

        return otp.ToString();
    }

    private string GetString(string key)
    {
        return key.ToLower() switch
        {
            "subject" => "Password Reset Request – Token Expires Soon",
            "body" => @"
Hi {0},

We received a request to reset your password. Please use the reset token below to set a new password:

{1}

⚠️ This reset token is valid until: {2:dddd, MMMM dd, yyyy hh:mm tt}

If you did not request this, please ignore this email or contact support.

Thanks,
The {3} Team
",
            _ => string.Empty
        };
    }

    public async Task<string?> Reset(ResetPasswordRequest request)
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(Reset));

        if (request.Password.Length < _passwordSettings.MinimumLength)
            return Common.Validation_MinLengthRequired_Format(FieldName.Password, 
                _passwordSettings.MinimumLength.ToString());

        var user = await _employeeRepository.FindByEmailAsync(request.Email);
        if (user == null)
        {
            _logger.LogWarn(LogMessage.UserNotFoundOnReset, request.Email);
            return ResponseMessage.InvalidUser;
        }

        if (user.ResetToken is null || user.TokenGeneratedDate is null || user.ResetToken != request.ResetToken)
        {
            _logger.LogWarn(LogMessage.ResetTokenNotGeneratedOrInvalid, request.Email);
            return ResponseMessage.InvalidResetToken;
        }

        var calculatedDate = user.TokenGeneratedDate.Value
            .AddDays(_passwordSettings.ResetTokenValidDays)
            .AddHours(_passwordSettings.ResetTokenValidHours)
            .AddMinutes(_passwordSettings.ResetTokenValidMinutes)
            .AddSeconds(_passwordSettings.ResetTokenValidSeconds);

        if (calculatedDate < DateTime.Now)
        {
            _logger.LogWarn(LogMessage.ResetTokenExpired, request.Email);
            return ResponseMessage.InvalidResetToken;
        }

        await _employeeRepository.ChangePassword(user, request.Password);

        _logger.LogInfo(LogMessage.EndMethod, nameof(Reset));

        return null;
    }
}