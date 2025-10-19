using Darkwolf.Shared.Middleware.Middlewares;
using Microsoft.AspNetCore.Builder;

namespace Darkwolf.Shared.Middleware;

public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseDarkwolfRequestLogging(this IApplicationBuilder app)
    {
        return app.UseMiddleware<RequestLoggingMiddleware>();
    }

    public static IApplicationBuilder UseDarkwolfGlobalException(this IApplicationBuilder app)
    {
        return app.UseMiddleware<ExceptionHandlingMiddleware>();
    }
}
