using Darkwolf.AuthService.Solution.Data.Interface;
using Darkwolf.AuthService.Solution.Data.Models;
using Darkwolf.AuthService.Solution.DTO;
using Darkwolf.AuthService.Solution.Utils.Common;
using Darkwolf.Shared.Authentication.Interface;
using Darkwolf.Shared.Logging.Interface;
using Microsoft.AspNetCore.Identity;

namespace Darkwolf.AuthService.Solution.Service;

public class TokenService
{
    private readonly IEmployeeRepository _employeeRepository;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly ILoggerManager<TokenService> _logger;

    public TokenService(IEmployeeRepository employeeRepository, 
        IJwtTokenService jwtTokenService,ILoggerManager<TokenService> logger)
    {
        _employeeRepository = employeeRepository;
        _jwtTokenService = jwtTokenService;
        _logger = logger;
    }

    public async Task<string?> GenerateToken(LoginRequest request)
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(GenerateToken));

        var user = await _employeeRepository.FindByEmpIdOrEmailAsync(request.Username);

        if (user == null)
        {
            _logger.LogWarn(LogMessage.UserNotFoundOnLogin, request.Username);
            return null;
        }

        if (!VerifyPassword(user, request.Password, user.EmployeePassword))
        {
            _logger.LogWarn(LogMessage.InvalidPassword, user.EmployeeId);
            return null;
        }

        var role = (await _employeeRepository.FindRoleByIdAsync(user.EmployeeId))?.RoleName;
        var token = _jwtTokenService.GenerateToken(user.EmployeeId, role!);

        _logger.LogInfo(LogMessage.EndMethod, nameof(GenerateToken));

        return token;
    }

    private bool VerifyPassword(Employee employee, string providedPassword, string storedPasswordHash)
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(VerifyPassword));

        if (string.IsNullOrEmpty(storedPasswordHash))
            return false;

        var hasher = new PasswordHasher<Employee>();
        // To verify:
        var result = hasher.VerifyHashedPassword(employee, storedPasswordHash, providedPassword);

        _logger.LogInfo(LogMessage.EndMethod, nameof(VerifyPassword));

        return result == PasswordVerificationResult.Success;
    }
}