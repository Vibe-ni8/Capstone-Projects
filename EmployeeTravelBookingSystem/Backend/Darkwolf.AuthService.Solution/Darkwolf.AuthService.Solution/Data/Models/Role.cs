using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Darkwolf.Shared.Common.Models;

namespace Darkwolf.AuthService.Solution.Data.Models;

public class Role : BaseEntity
{
    public Role() : base("ROLE")
    { }

    [Key]
    [Column("role_id")]
    public string RoleId { get; set; } = null!;

    [Column("role_name")]
    public string RoleName { get; set; } = null!;
}
