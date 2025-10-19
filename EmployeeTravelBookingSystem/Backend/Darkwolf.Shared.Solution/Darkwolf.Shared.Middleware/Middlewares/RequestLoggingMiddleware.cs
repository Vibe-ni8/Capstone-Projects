using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Darkwolf.Shared.Middleware.Middlewares;

internal class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        _logger.LogInformation("\nIncoming request: {Method} {Path}", context.Request.Method, context.Request.Path);
        await _next(context);
        _logger.LogInformation("Response: {StatusCode}\n", context.Response.StatusCode);
    }
}