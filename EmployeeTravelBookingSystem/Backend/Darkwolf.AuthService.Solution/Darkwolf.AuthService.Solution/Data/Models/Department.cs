using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Darkwolf.Shared.Common.Models;

namespace Darkwolf.AuthService.Solution.Data.Models;

public class Department : BaseEntity
{
    public Department() : base("DEPARTMENT")
    { }

    [Key]
    [Column("dept_id")]
    public string DepartmentId { get; set; } = null!;

    [Column("dept_name")]
    public string DepartmentName { get; set; } = null!;

    [Column("sl_id")]
    public string ServiceLineId { get; set; } = null!;
}
