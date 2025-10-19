using System.Text;
using Darkwolf.AuthService.Solution.Data.Interface;
using Darkwolf.AuthService.Solution.DTO;
using Darkwolf.AuthService.Solution.Utils.Common;
using Darkwolf.AuthService.Solution.Utils.Settings;
using Darkwolf.Shared.Common;
using Darkwolf.Shared.Logging.Interface;
using Microsoft.Extensions.Options;

namespace Darkwolf.AuthService.Solution.Service;

public class PasswordService
{
    private readonly IEmployeeRepository _employeeRepository;
    private readonly PasswordSettings _passwordSettings;
    private readonly ILoggerManager<PasswordService> _logger;

    public PasswordService(IEmployeeRepository employeeRepository,
        IOptions<PasswordSettings> options, ILoggerManager<PasswordService> logger)
    {
        _employeeRepository = employeeRepository;
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
        var otp = GenerateOtp();
        await _employeeRepository.SetOtp(user, otp, DateTime.Now);

        _logger.LogInfo(LogMessage.EndMethod, nameof(Forgot));

        return otp;
    }

    private static string GenerateOtp(int length = 4)
    {
        var random = new Random();
        var otp = new StringBuilder();

        for (int i = 0; i < length; i++)
            otp.Append(random.Next(0, 10)); // digits 0–9

        return otp.ToString();
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

        if (user.Otp is null || user.OtpGeneratedDate is null || user.Otp != request.Otp)
        {
            _logger.LogWarn(LogMessage.OtpNotGeneratedOrInvalid, request.Email);
            return ResponseMessage.InvalidOtp;
        }

        var calculatedDate = user.OtpGeneratedDate.Value
            .AddDays(_passwordSettings.OtpValidDays)
            .AddHours(_passwordSettings.OtpValidHours)
            .AddMinutes(_passwordSettings.OtpValidMinutes)
            .AddSeconds(_passwordSettings.OtpValidSeconds);

        if (calculatedDate < DateTime.Now)
        {
            _logger.LogWarn(LogMessage.OtpExpired, request.Email);
            return ResponseMessage.InvalidOtp;
        }

        await _employeeRepository.ChangePassword(user, request.Password);

        _logger.LogInfo(LogMessage.EndMethod, nameof(Reset));

        return null;
    }
}