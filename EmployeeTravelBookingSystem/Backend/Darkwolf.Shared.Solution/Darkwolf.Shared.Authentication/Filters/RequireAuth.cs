using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace HireHub.Shared.Authentication.Filters;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
public class RequireAuthAttribute : Attribute, IAuthorizationFilter
{
    public string? Role { get; set; }

    public RequireAuthAttribute() { }

    public RequireAuthAttribute(string role)
    {
        Role = role;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        if (context.HttpContext.User?.Identity == null || !context.HttpContext.User.Identity.IsAuthenticated)
        {
            context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            context.Result = new ContentResult
            {
                StatusCode = StatusCodes.Status401Unauthorized,
                Content = "Unauthorized"
            };
            return;
        }

        // Optional: check roles
        if (!string.IsNullOrEmpty(Role) &&
            !context.HttpContext.User.IsInRole(Role))
        {
            context.HttpContext.Response.StatusCode = StatusCodes.Status403Forbidden;
            context.Result = new ContentResult
            {
                StatusCode = StatusCodes.Status403Forbidden,
                Content = "Forbidden"
            };
            return;
        }
    }
}
