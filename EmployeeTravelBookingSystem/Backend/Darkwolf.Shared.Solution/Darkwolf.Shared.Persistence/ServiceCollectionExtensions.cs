using Darkwolf.Shared.Persistence.Interface;
using Darkwolf.Shared.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Darkwolf.Shared.Persistence;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDarkwolfPersistence(
        this IServiceCollection services)
    {
        services.AddSingleton(typeof(IGenericRepository<>), typeof(GenericRepository<>));

        return services;
    }
}
