using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Darkwolf.Shared.Common.Models;

namespace Darkwolf.AuthService.Solution.Data.Models;

public class EmployeeDetails : BaseEntity
{
    public EmployeeDetails() : base("EMP_DETAILS")
    { }

    [Key]
    [Column("emp_id")]
    public string EmpId { get; set; } = null!;

    [Column("reporting_mgr_id")]
    public string ReportingManagerId { get; set; } = null!;

    [Column("home_mgr_id")]
    public string HomeManagerId { get; set; } = null!;

    [Column("wrk_mgr_id")]
    public string WorkManagerId { get; set; } = null!;
}