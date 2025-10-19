using Darkwolf.Shared.Logging.Interface;
using Microsoft.Extensions.DependencyInjection;

namespace Darkwolf.Shared.Logging;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDarkwolfLogger(
        this IServiceCollection services)
    {
        // Logging
        services.AddSingleton(typeof(ILoggerManager<>), typeof(LoggerManager<>));

        return services;
    }
}
