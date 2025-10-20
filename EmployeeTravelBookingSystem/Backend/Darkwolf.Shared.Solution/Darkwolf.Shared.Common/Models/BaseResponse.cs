namespace Darkwolf.Shared.Common.Models;

public class BaseResponse
{
    public IList<object> Warnings { get; set; } = new List<object>();

    public IList<object> Errors { get; set; } = new List<object>();
}
