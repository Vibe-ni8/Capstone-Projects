using Darkwolf.AuthService.Solution.DTO;
using Darkwolf.AuthService.Solution.Service;
using Darkwolf.AuthService.Solution.Utils.Common;
using Darkwolf.Shared.Logging.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Darkwolf.AuthService.Solution.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : Controller
{
    private readonly UserService _userService;
    private readonly PasswordService _passwordService;
    private readonly ILoggerManager<AuthController> _logger;

    public AuthController(UserService userService, PasswordService passwordService,
        ILoggerManager<AuthController> logger)
    {
        _userService = userService;
        _passwordService = passwordService;
        _logger = logger;
    }

    [HttpPost("token")]
    public async Task<IActionResult> Token([FromBody] LoginRequest request)
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(Token));

        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new { Message = ResponseMessage.LoginCredentialsRequired });

        var token = await _userService.GenerateToken(request);
        if (token == null)
            return Unauthorized(new { Message = ResponseMessage.InvalidCredentials });

        _logger.LogInfo(LogMessage.EndMethod, nameof(Token));

        return Ok(new { Token = token });
    }

    [HttpPost("password/forgot")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(ForgotPassword));

        if (string.IsNullOrWhiteSpace(request.Email))
            return BadRequest(new { Message = ResponseMessage.EmailRequired });

        var resetToken = await _passwordService.Forgot(request);
        if (resetToken == null)
            return Unauthorized(new { Message = ResponseMessage.EmailNotRegistered });

        _logger.LogInfo(LogMessage.EndMethod, nameof(ForgotPassword));

        return Ok(new { Message = string.Format(ResponseMessage.ResetTokenSent, request.Email) });
    }

    [HttpPost("password/reset")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(ResetPassword));

        var msg = string.IsNullOrWhiteSpace(request.Email) ? ResponseMessage.EmailRequired
            : string.IsNullOrWhiteSpace(request.Password) ? ResponseMessage.PasswordRequired 
            : string.IsNullOrEmpty(request.ResetToken) ? ResponseMessage.ResetTokenRequired : null;

        msg ??= await _passwordService.Reset(request);

        if (msg != null)
            return BadRequest(new { Message = msg });

        _logger.LogInfo(LogMessage.EndMethod, nameof(ResetPassword));

        return Ok(new { Message = string.Format(ResponseMessage.PasswordResetSuccess, request.Email) });
    }
}
