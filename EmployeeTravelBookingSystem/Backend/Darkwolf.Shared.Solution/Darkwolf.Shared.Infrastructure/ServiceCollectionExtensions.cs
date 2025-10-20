using Darkwolf.Shared.Infrastructure.Interface;
using Darkwolf.Shared.Infrastructure.Models;
using Darkwolf.Shared.Infrastructure.Service;
using Microsoft.Extensions.DependencyInjection;

namespace Darkwolf.Shared.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDarkwolfInfra(
        this IServiceCollection services, DarkwolfEmailConfig emailConfig)
    {
        services.AddSingleton<IDarkwolfEmailService>(new DarkwolfEmailService(emailConfig));
        return services;
    }

    public static IServiceCollection AddDarkwolfEmailService(
        this IServiceCollection services, DarkwolfEmailConfig emailConfig)
    {
        services.AddSingleton<IDarkwolfEmailService>(new DarkwolfEmailService(emailConfig));
        return services;
    }
}
