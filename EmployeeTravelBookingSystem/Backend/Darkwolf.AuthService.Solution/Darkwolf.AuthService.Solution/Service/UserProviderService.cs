using Darkwolf.AuthService.Solution.Data.Interface;
using Darkwolf.AuthService.Solution.Data.Models;
using Darkwolf.AuthService.Solution.DTO;
using Darkwolf.AuthService.Solution.Utils.Common;
using Darkwolf.Shared.Logging.Interface;

namespace Darkwolf.AuthService.Solution.Service;

public class UserProviderService
{
    private readonly IEmployeeRepository _employeeRepository;
    private readonly IHttpContextAccessor _http;
    private readonly ILoggerManager<UserProviderService> _logger;

    public UserProviderService(IEmployeeRepository employeeRepository,
        IHttpContextAccessor http, ILoggerManager<UserProviderService> logger)
    {
        _employeeRepository = employeeRepository;
        _http = http;
        _logger = logger;
    }

    public Task<Employee?> CurrentUser => GetCurrentUser();

    private async Task<Employee?> GetCurrentUser()
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(GetCurrentUser));

        var userId = _http.HttpContext?.Items[Keys.UserId]?.ToString() ?? throw new InvalidOperationException(ExceptionMessage.UserIdNotSetOnMiddleware);

        var user = await _employeeRepository.FindByEmpIdOrEmailAsync(userId);

        _logger.LogInfo(LogMessage.EndMethod, nameof(GetCurrentUser));

        return user;
    }

    public Task<Role?> CurrentUserRole => GetCurrentUserRole();

    private async Task<Role?> GetCurrentUserRole()
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(GetCurrentUserRole));

        var userId = _http.HttpContext?.Items[Keys.UserId]?.ToString() ?? throw new InvalidOperationException(ExceptionMessage.UserIdNotSetOnMiddleware);

        var role = await _employeeRepository.FindRoleByIdAsync(userId);

        _logger.LogInfo(LogMessage.EndMethod, nameof(GetCurrentUserRole));

        return role;
    }

    public Task<Department?> CurrentUserDepartment => GetCurrentUserDepartment();

    private async Task<Department?> GetCurrentUserDepartment()
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(GetCurrentUserDepartment));

        var userId = _http.HttpContext?.Items[Keys.UserId]?.ToString() ?? throw new InvalidOperationException(ExceptionMessage.UserIdNotSetOnMiddleware);

        var department = await _employeeRepository.FindDepartmentByIdAsync(userId);

        _logger.LogInfo(LogMessage.EndMethod, nameof(GetCurrentUserDepartment));

        return department;
    }

    public Task<ServiceLine?> CurrentUserServiceLine => GetCurrentUserServiceLine();

    private async Task<ServiceLine?> GetCurrentUserServiceLine()
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(GetCurrentUserServiceLine));

        var userId = _http.HttpContext?.Items[Keys.UserId]?.ToString() ?? throw new InvalidOperationException(ExceptionMessage.UserIdNotSetOnMiddleware);

        var serviceLine = await _employeeRepository.FindServiceLineByIdAsync(userId);

        _logger.LogInfo(LogMessage.EndMethod, nameof(GetCurrentUserServiceLine));

        return serviceLine;
    }

    public Task<Location?> CurrentUserLocation => GetCurrentUserLocation();

    private async Task<Location?> GetCurrentUserLocation()
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(GetCurrentUserLocation));

        var userId = _http.HttpContext?.Items[Keys.UserId]?.ToString() ?? throw new InvalidOperationException(ExceptionMessage.UserIdNotSetOnMiddleware);

        var location = await _employeeRepository.FindLocationByIdAsync(userId);

        _logger.LogInfo(LogMessage.EndMethod, nameof(GetCurrentUserLocation));

        return location;
    }

    public Task<EmployeeWithRole?> CurrentUserReportsTo => GetCurrentUserReportsTo();

    private async Task<EmployeeWithRole?> GetCurrentUserReportsTo()
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(GetCurrentUserReportsTo));

        var userId = _http.HttpContext?.Items[Keys.UserId]?.ToString() ?? throw new InvalidOperationException(ExceptionMessage.UserIdNotSetOnMiddleware);

        var reportingManager = await _employeeRepository.FindUserReportsToAsync(userId);

        var reportingManagerwithRole = reportingManager is not null ? await _employeeRepository.GetWithRoleAsync(reportingManager) : null;

        _logger.LogInfo(LogMessage.EndMethod, nameof(GetCurrentUserReportsTo));

        return reportingManagerwithRole;
    }

    public Task<EmployeeWithRole?> CurrentUserHomeManager => GetCurrentUserHomeManager();

    private async Task<EmployeeWithRole?> GetCurrentUserHomeManager()
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(GetCurrentUserHomeManager));

        var userId = _http.HttpContext?.Items[Keys.UserId]?.ToString() ?? throw new InvalidOperationException(ExceptionMessage.UserIdNotSetOnMiddleware);

        var homeManager = await _employeeRepository.FindUserHomeManagerAsync(userId);

        var homeManagerwithRole = homeManager is not null ? await _employeeRepository.GetWithRoleAsync(homeManager) : null;

        _logger.LogInfo(LogMessage.EndMethod, nameof(GetCurrentUserHomeManager));

        return homeManagerwithRole;
    }

    public Task<EmployeeWithRole?> CurrentUserWorkManager => GetCurrentUserWorkManager();

    private async Task<EmployeeWithRole?> GetCurrentUserWorkManager()
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(GetCurrentUserWorkManager));

        var userId = _http.HttpContext?.Items[Keys.UserId]?.ToString() ?? throw new InvalidOperationException(ExceptionMessage.UserIdNotSetOnMiddleware);

        var WorkManager = await _employeeRepository.FindUserWorkManagerAsync(userId);

        var WorkManagerwithRole = WorkManager is not null ? await _employeeRepository.GetWithRoleAsync(WorkManager) : null;

        _logger.LogInfo(LogMessage.EndMethod, nameof(GetCurrentUserWorkManager));

        return WorkManagerwithRole;
    }

    public Task<List<EmployeeWithRole>> UsersReportsToCurrentUser => GetUsersReportsToCurrentUser();

    private async Task<List<EmployeeWithRole>> GetUsersReportsToCurrentUser()
    {
        _logger.LogInfo(LogMessage.StartMethod, nameof(GetUsersReportsToCurrentUser));

        var userId = _http.HttpContext?.Items[Keys.UserId]?.ToString() ?? throw new InvalidOperationException(ExceptionMessage.UserIdNotSetOnMiddleware);

        var subordinates = await _employeeRepository.FindUsersReportsToHimAsync(userId);

        var subordinatesWithRole = await _employeeRepository.GetWithRoleAsync(subordinates);

        _logger.LogInfo(LogMessage.EndMethod, nameof(GetUsersReportsToCurrentUser));

        return subordinatesWithRole;
    }
}
