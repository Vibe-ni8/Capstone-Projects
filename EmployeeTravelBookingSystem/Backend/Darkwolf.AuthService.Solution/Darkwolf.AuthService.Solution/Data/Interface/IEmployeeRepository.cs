using Darkwolf.AuthService.Solution.Data.Models;

namespace Darkwolf.AuthService.Solution.Data.Interface;

public interface IEmployeeRepository
{
    Task<Employee?> FindByEmpIdOrEmailAsync(string username);
    Task<Employee?> FindByEmailAsync(string email);
    Task<Role> FindRoleById(string id);
    Task SetResetToken(Employee employee, string resetToken, DateTime tokenGeneratedDate);
    Task ChangePassword(Employee employee, string newPassword);
}