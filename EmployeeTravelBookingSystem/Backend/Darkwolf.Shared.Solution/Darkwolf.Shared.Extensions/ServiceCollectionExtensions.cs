using Darkwolf.Shared.Logging;
using Microsoft.Extensions.DependencyInjection;
using Darkwolf.Shared.Authentication;
using Darkwolf.Shared.Authentication.Models;

namespace Darkwolf.Shared.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDarkwolfShared(
        this IServiceCollection services,
        JwtSettings jwtSettings)
    {
        // Authentication
        services.AddDarkwolfAuth(jwtSettings);

        // Logging
        services.AddDarkwolfLogger();

        return services;
    }
}
