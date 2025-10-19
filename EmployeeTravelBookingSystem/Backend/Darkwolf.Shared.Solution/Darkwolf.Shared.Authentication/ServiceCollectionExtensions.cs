using Darkwolf.Shared.Authentication.Interface;
using Darkwolf.Shared.Authentication.Models;
using Darkwolf.Shared.Authentication.Service;
using Microsoft.Extensions.DependencyInjection;

namespace Darkwolf.Shared.Authentication;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDarkwolfAuth(
        this IServiceCollection services,
        JwtSettings jwtSettings)
    {
        // Authentication
        services.AddSingleton<IJwtTokenService>(new JwtTokenService(jwtSettings));

        return services;
    }
}