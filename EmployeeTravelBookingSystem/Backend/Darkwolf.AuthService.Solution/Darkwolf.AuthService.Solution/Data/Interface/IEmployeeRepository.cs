using Darkwolf.AuthService.Solution.Data.Models;
using Darkwolf.AuthService.Solution.DTO;

namespace Darkwolf.AuthService.Solution.Data.Interface;

public interface IEmployeeRepository
{
    Task<Employee?> FindByEmpIdOrEmailAsync(string username);
    Task<Employee?> FindByEmailAsync(string email);
    Task<Role?> FindRoleByIdAsync(string employeeId);
    Task<Role?> FindRoleAsync(Employee employee);
    Task<Location?> FindLocationByIdAsync(string employeeId);
    Task<Employee?> FindUserReportsToAsync(string employeeId);
    Task<List<Employee>> FindUsersReportsToHimAsync(string employeeId);
    Task<EmployeeWithRole?> GetWithRoleAsync(Employee employee);
    Task<List<EmployeeWithRole>> GetWithRoleAsync(List<Employee> employees);
    Task SetResetToken(Employee employee, string resetToken, DateTime tokenGeneratedDate);
    Task ChangePassword(Employee employee, string newPassword);
}