using System.Threading.Tasks;
using Darkwolf.AuthService.Solution.Data.Interface;
using Darkwolf.AuthService.Solution.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Darkwolf.AuthService.Solution.Data.Repositories;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly AuthDbContext _db;

    public EmployeeRepository(AuthDbContext db)
    {
        _db = db;
    }

    public async Task<Employee?> FindByEmpIdOrEmailAsync(string username)
    {
        return await _db.Employees.FirstOrDefaultAsync(e => 
            username.Contains("@") ? e.EmpEmail == username : e.EmpId == username);
    }

    public async Task<Employee?> FindByEmailAsync(string email)
    {
        return await _db.Employees
            .FirstOrDefaultAsync(e => e.EmpEmail == email);
    }

    public async Task<Role> FindRoleById(string employeeId)
    {
        return await _db.Employees
            .Where(e => employeeId.Equals(e.EmpId))
            .Join(_db.Roles, e => e.RoleId, r => r.RoleId, (e, r) => r)
            .FirstAsync();
    }

    public async Task SetOtp(Employee employee, string otp, DateTime otpGeneratedDate)
    {
        employee.Otp = otp;
        employee.OtpGeneratedDate = otpGeneratedDate;
        _db.Employees.Update(employee);
        await _db.SaveChangesAsync();
    }

    public async Task ChangePassword(Employee employee, string newPassword)
    {
        employee.Otp = null;
        employee.OtpGeneratedDate = null;
        employee.EmpPassword = new PasswordHasher<Employee>().HashPassword(employee, newPassword);
        _db.Employees.Update(employee);
        await _db.SaveChangesAsync();
    }
}
