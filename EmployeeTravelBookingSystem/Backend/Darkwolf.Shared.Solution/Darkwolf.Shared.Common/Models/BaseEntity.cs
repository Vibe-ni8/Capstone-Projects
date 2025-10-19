using System.ComponentModel.DataAnnotations.Schema;

namespace Darkwolf.Shared.Common.Models;

public class BaseEntity
{
    public BaseEntity(string tableName) { 
        TableName = tableName;
    }

    [NotMapped]
    public string TableName { get; set; } = string.Empty;
}
