using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Darkwolf.Shared.Common.Models;

namespace Darkwolf.AuthService.Solution.Data.Models;

public class Location : BaseEntity
{
    public Location() : base("Location")
    { }

    [Key]
    [Column("loc_id")]
    public string LocationId { get; set; } = null!;

    [Column("loc_short_name")]
    public string LocationShortName { get; set; } = null!;
}