using Darkwolf.Shared.Logging;
using Microsoft.Extensions.DependencyInjection;
using Darkwolf.Shared.Authentication;
using Darkwolf.Shared.Authentication.Models;
using Darkwolf.Shared.Persistence;
using Darkwolf.Shared.Infrastructure;
using Darkwolf.Shared.Infrastructure.Models;

namespace Darkwolf.Shared.Extensions;

public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Added DarkwolfLogger, DarkwolfPersistence
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddDarkwolfShared(
        this IServiceCollection services)
    {
        // Logging
        services.AddDarkwolfLogger();

        // Persistence
        services.AddDarkwolfPersistence();

        return services;
    }

    /// <summary>
    /// Added DarkwolfAuth, DarkwolfLogger, DarkwolfPersistence
    /// </summary>
    /// <param name="services"></param>
    /// <param name="jwtSettings"></param>
    /// <returns></returns>
    public static IServiceCollection AddDarkwolfShared(
        this IServiceCollection services,
        JwtSettings jwtSettings)
    {
        // Authentication
        services.AddDarkwolfAuth(jwtSettings);

        // Logging
        services.AddDarkwolfLogger();

        // Persistence
        services.AddDarkwolfPersistence();

        return services;
    }

    /// <summary>
    /// Added DarkwolfAuth, DarkwolfLogger, DarkwolfPersistence, DarkwolfInfra
    /// </summary>
    /// <param name="services"></param>
    /// <param name="jwtSettings"></param>
    /// <param name="emailConfig"></param>
    /// <returns></returns>
    public static IServiceCollection AddDarkwolfShared(
        this IServiceCollection services,
        JwtSettings jwtSettings, DarkwolfEmailConfig emailConfig)
    {
        // Authentication
        services.AddDarkwolfAuth(jwtSettings);

        // Logging
        services.AddDarkwolfLogger();

        // Persistence
        services.AddDarkwolfPersistence();

        // Infrastructure
        services.AddDarkwolfInfra(emailConfig);

        return services;
    }
}
