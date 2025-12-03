using System.Security.Claims;
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

        var claims = _jwtService.ValidateToken(token);
        if (claims == null)
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Invalid token.");
            return;
        }

        context.Items["UserId"] = claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value; // store for later usage
        context.Items["Role"] = claims.First(x => x.Type == ClaimTypes.Role).Value;

        await _next(context);
    }

    private async Task Process(HttpContext context)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        if (!string.IsNullOrEmpty(token))
        {
            var claims = _jwtService.ValidateToken(token);
            if (claims != null)
            {
                var identity = new ClaimsIdentity(claims, "Jwt HireHub");
                context.User = new ClaimsPrincipal(identity);

                context.Items["UserId"] = claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value;
                context.Items["Role"] = claims.First(x => x.Type == ClaimTypes.Role).Value;
            }
        }

        await _next(context);
    }

}