using Darkwolf.AuthService.Solution.Data.Models;

namespace Darkwolf.AuthService.Solution.Data.Interface;

public interface IEmployeeRepository
{
    Task<Employee?> FindByEmpIdOrEmailAsync(string username);
    Task<Employee?> FindByEmailAsync(string email);
    Task<Role> FindRoleById(string id);
    Task SetOtp(Employee employee, string otp, DateTime otpGeneratedDate);
    Task ChangePassword(Employee employee, string newPassword);
}