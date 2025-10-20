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
    public string EmpId { get; set; } = null!;

    [Column("emp_name")]
    public string EmpName { get; set; } = null!;

    [Column("emp_email")]
    public string EmpEmail { get; set; } = null!;

    [Column("emp_password")]
    public string EmpPassword { get; set; } = null!;

    [Column("role_id")]
    public string RoleId { get; set; } = null!;

    [Column("dept_id")]
    public string DeptId { get; set; } = null!;

    [Column("reset_token")]
    public string? ResetToken { get; set; } = null;

    [Column("token_generated_date")]
    public DateTime? TokenGeneratedDate { get; set; } = null;
}