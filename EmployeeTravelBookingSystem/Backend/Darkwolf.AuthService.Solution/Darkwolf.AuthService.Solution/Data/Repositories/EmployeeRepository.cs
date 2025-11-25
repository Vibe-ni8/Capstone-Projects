using Darkwolf.AuthService.Solution.Data.Interface;
using Darkwolf.AuthService.Solution.Data.Models;
using Darkwolf.AuthService.Solution.DTO;
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
            username.Contains("@") ? e.EmployeeEmail == username : e.EmployeeId == username);
    }

    public async Task<Employee?> FindByEmailAsync(string email)
    {
        return await _db.Employees
            .FirstOrDefaultAsync(e => e.EmployeeEmail == email);
    }

    public async Task<Role?> FindRoleByIdAsync(string employeeId)
    {
        return await _db.Employees
            .Where(e => employeeId.Equals(e.EmployeeId))
            .Join(_db.Roles, e => e.RoleId, r => r.RoleId, (e, r) => r)
            .FirstOrDefaultAsync();
    }

    public async Task<Role?> FindRoleAsync(Employee employee)
    {
        return await _db.Roles
            .Where(r => employee.RoleId.Equals(r.RoleId))
            .FirstOrDefaultAsync();
    }

    public async Task<Department?> FindDepartmentByIdAsync(string employeeId)
    {
        return await _db.Employees
            .Where(e => employeeId.Equals(e.EmployeeId))
            .Join(_db.Departments, e => e.DepartmentId, d => d.DepartmentId, (e, d) => d)
            .FirstOrDefaultAsync();
    }

    public async Task<ServiceLine?> FindServiceLineByIdAsync(string employeeId)
    {
        return await _db.Employees
            .Where(e => employeeId.Equals(e.EmployeeId))
            .Join(_db.Departments, e => e.DepartmentId, d => d.DepartmentId, (e, d) => d)
            .Join(_db.ServiceLines, d => d.ServiceLineId, sl => sl.ServiceLineId, (d, sl) => sl)
            .FirstOrDefaultAsync();
    }

    public async Task<Location?> FindLocationByIdAsync(string employeeId)
    {
        return await _db.Employees
            .Where(e => employeeId.Equals(e.EmployeeId))
            .Join(_db.Locations, e => e.LocationId, l => l.LocationId, (e, l) => l)
            .FirstOrDefaultAsync();
    }

    public async Task<Employee?> FindUserReportsToAsync(string employeeId)
    {
        return await _db.EmployeeDetails
            .Where(e => employeeId.Equals(e.EmployeeId))
            .Join(_db.Employees, ed => ed.ReportingManagerId, e => e.EmployeeId, (ed, e) => e)
            .FirstOrDefaultAsync();
    }

    public async Task<Employee?> FindUserHomeManagerAsync(string employeeId)
    {
        return await _db.EmployeeDetails
            .Where(e => employeeId.Equals(e.EmployeeId))
            .Join(_db.Employees, ed => ed.HomeManagerId, e => e.EmployeeId, (ed, e) => e)
            .FirstOrDefaultAsync();
    }

    public async Task<Employee?> FindUserWorkManagerAsync(string employeeId)
    {
        return await _db.EmployeeDetails
            .Where(e => employeeId.Equals(e.EmployeeId))
            .Join(_db.Employees, ed => ed.WorkManagerId, e => e.EmployeeId, (ed, e) => e)
            .FirstOrDefaultAsync();
    }

    public async Task<List<Employee>> FindUsersReportsToHimAsync(string employeeId)
    {
        return await _db.EmployeeDetails
            .Where(e => employeeId.Equals(e.ReportingManagerId))
            .Join(_db.Employees, ed => ed.EmployeeId, e => e.EmployeeId, (ed, e) => e)
            .ToListAsync();
    }

    public async Task<EmployeeWithRole?> GetWithRoleAsync(Employee employee)
    {
        return await _db.Roles
            .Where(r => employee.RoleId.Equals(r.RoleId))
            .Select(r => new EmployeeWithRole()
            {
                EmployeeId = employee.EmployeeId,
                Name = employee.EmployeeName,
                Email = employee.EmployeeEmail,
                RoleId = employee.RoleId,
                Role = r.RoleName
            })
            .FirstOrDefaultAsync();
    }

    public async Task<List<EmployeeWithRole>> GetWithRoleAsync(List<Employee> employees)
    {
        return (await _db.Roles.ToListAsync())
            .Join(employees, r => r.RoleId, e => e.RoleId, (r, e) => new {e, r})
            .Select(joined => new EmployeeWithRole()
            {
                EmployeeId = joined.e.EmployeeId,
                Name = joined.e.EmployeeName,
                Email = joined.e.EmployeeEmail,
                RoleId = joined.e.RoleId,
                Role = joined.r.RoleName
            }).ToList();
    }

    public async Task SetResetToken(Employee employee, string resetToken, DateTime tokenGeneratedDate)
    {
        employee.ResetToken = resetToken;
        employee.TokenGeneratedDate = tokenGeneratedDate;
        _db.Employees.Update(employee);
        await _db.SaveChangesAsync();
    }

    public async Task ChangePassword(Employee employee, string newPassword)
    {
        employee.ResetToken = null;
        employee.TokenGeneratedDate = null;
        employee.EmployeePassword = new PasswordHasher<Employee>().HashPassword(employee, newPassword);
        _db.Employees.Update(employee);
        await _db.SaveChangesAsync();
    }
}
