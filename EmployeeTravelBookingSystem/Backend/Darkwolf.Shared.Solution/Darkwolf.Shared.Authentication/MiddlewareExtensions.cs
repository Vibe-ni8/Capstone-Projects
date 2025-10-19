using Darkwolf.Shared.Authentication.Middleware;
using Microsoft.AspNetCore.Builder;

namespace Darkwolf.Shared.Authentication;

public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseDarkwolfAuth(this IApplicationBuilder app)
    {
        return app.UseMiddleware<AuthMiddleware>();
    }
}
