using Darkwolf.AuthService.Solution.Service;
using Darkwolf.AuthService.Solution.Utils.Common;
using Darkwolf.Shared.Logging.Interface;
using Darkwolf.Shared.Middleware.Models;
using Microsoft.AspNetCore.Mvc;

namespace Darkwolf.AuthService.Solution.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : Controller
{
    private readonly UserProviderService _userProviderService;
    private readonly ILoggerManager<UserController> _logger;

    public UserController(UserProviderService userProviderService,
        ILoggerManager<UserController> logger)
    {
        _userProviderService = userProviderService;
        _logger = logger;
    }

    [HttpGet("current/info")]
    [ProducesResponseType<object>(200)]
    [ProducesResponseType<object>(401)]
    [ProducesResponseType<object>(404)]
    [ProducesResponseType<ErrorResponse>(500)]
    public async Task<IActionResult> GetInfo()
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(GetInfo));

        var user = await _userProviderService.CurrentUser;

        if (user == null)
            return NotFound(ResponseMessage.UserNotFound);

        var role = await _userProviderService.CurrentUserRole;

        _logger.LogInfo(LogMessage.EndMethod, nameof(GetInfo));

        return Ok(new
        {
            UserId = user.EmployeeId,
            Name = user.EmployeeName,
            Email = user.EmployeeEmail,
            Role = role?.RoleName,
            DepartmentId = user.DeptId,
            Phone = user.Phone,
            Location = user.LocationId
        });
    }

    [HttpGet("current/info/all")]
    [ProducesResponseType<object>(200)]
    [ProducesResponseType<object>(401)]
    [ProducesResponseType<object>(404)]
    [ProducesResponseType<ErrorResponse>(500)]
    public async Task<IActionResult> GetAllInfo()
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(GetAllInfo));

        var user = await _userProviderService.CurrentUser;

        if (user == null)
        {
            _logger.LogWarn(LogMessage.UserNotFound);
            return NotFound(ResponseMessage.UserNotFound);
        }

        var role = await _userProviderService.CurrentUserRole;
        var location = await _userProviderService.CurrentUserLocation;
        var reportingTo = await _userProviderService.CurrentUserReportsTo;
        var reportsToHim = await _userProviderService.UsersReportsToCurrentUser;

        _logger.LogInfo(LogMessage.EndMethod, nameof(GetAllInfo));

        return Ok(new
        {
            UserId = user.EmployeeId,
            Name = user.EmployeeName,
            Role = role?.RoleName,
            DepartmentId = user.DeptId,
            Contact = new
            {
                Email = user.EmployeeEmail,
                Phone = user.Phone,
                Location = location?.LocationShortName
            },
            Organization = new
            {
                ReportingTo = reportingTo,
                ReportsToHim = reportsToHim
            }
        });
    }
}
