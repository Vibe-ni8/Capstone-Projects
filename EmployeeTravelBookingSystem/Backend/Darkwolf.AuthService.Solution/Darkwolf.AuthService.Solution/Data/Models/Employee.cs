using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Darkwolf.Shared.Common.Models;

namespace Darkwolf.AuthService.Solution.Data.Models;

public class Employee : BaseEntity
{
    public Employee() : base("EMPLOYEE")
    { }

    [Key]
    [Column("emp_id")]
    public string EmployeeId { get; set; } = null!;

    [Column("emp_name")]
    public string EmployeeName { get; set; } = null!;

    [Column("emp_email")]
    public string EmployeeEmail { get; set; } = null!;

    [Column("emp_password")]
    public string EmployeePassword { get; set; } = null!;

    [Column("role_id")]
    public string RoleId { get; set; } = null!;

    [Column("dept_id")]
    public string DepartmentId { get; set; } = null!;

    [Column("reset_token")]
    public string? ResetToken { get; set; } = null;

    [Column("token_generated_date")]
    public DateTime? TokenGeneratedDate { get; set; } = null;

    [Column("phone")]
    public string? Phone { get; set; } = null;

    [Column("loc_id")]
    public string LocationId { get; set; } = null!;
}