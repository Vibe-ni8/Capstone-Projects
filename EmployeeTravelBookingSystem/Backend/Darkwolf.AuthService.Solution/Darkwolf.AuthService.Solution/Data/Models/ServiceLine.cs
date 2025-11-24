using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Darkwolf.Shared.Common.Models;

namespace Darkwolf.AuthService.Solution.Data.Models;

public class ServiceLine : BaseEntity
{
    public ServiceLine() : base("SERVICE_LINE")
    { }

    [Key]
    [Column("sl_id")]
    public string ServiceLineId { get; set; } = null!;

    [Column("sl_name")]
    public string ServiceLineName { get; set; } = null!;
}