using Darkwolf.Shared.Authentication.Interface;
using Microsoft.AspNetCore.Http;

namespace Darkwolf.Shared.Authentication.Middleware;

internal class AuthMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IJwtTokenService _jwtService;

    public AuthMiddleware(RequestDelegate next, IJwtTokenService jwtService)
    {
        _next = next;
        _jwtService = jwtService;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        if (string.IsNullOrEmpty(token))
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Authorization token missing.");
            return;
        }

        var userId = _jwtService.ValidateToken(token);
        if (userId == null)
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Invalid token.");
            return;
        }

        context.Items["UserId"] = userId; // store for later usage
        await _next(context);
    }
}