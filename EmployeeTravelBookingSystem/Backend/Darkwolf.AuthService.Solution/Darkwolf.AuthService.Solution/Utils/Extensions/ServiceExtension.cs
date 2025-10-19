using Darkwolf.AuthService.Solution.Data;
using Darkwolf.AuthService.Solution.Data.Interface;
using Darkwolf.AuthService.Solution.Data.Repositories;
using Darkwolf.AuthService.Solution.Service;
using Darkwolf.AuthService.Solution.Utils.Common;
using Darkwolf.AuthService.Solution.Utils.Settings;
using Darkwolf.Shared.Authentication.Models;
using Darkwolf.Shared.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Darkwolf.AuthService.Solution.Utils.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection RegisterServices(
        this IServiceCollection services, IConfigurationManager configuration)
    {
        // Darkwolf Authentication and Logging
        services.AddDarkwolfShared(configuration.GetSection(AppSettingKey.JwtSettings)
            .Get<JwtSettings>() ?? throw new InvalidOperationException(ExceptionMessage.JwtNotConfigured));

        services.Configure<PasswordSettings>(configuration.GetSection(AppSettingKey.PasswordSettings));

        var connectionString = configuration.GetConnectionString(AppSettingKey.DefaultConnection) 
            ?? throw new InvalidOperationException(ExceptionMessage.ConnectionStringNotConfigured);
        services.AddDbContext<AuthDbContext>(options => options
        .UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

        services.AddScoped<IEmployeeRepository, EmployeeRepository>()
            .AddScoped<UserService>().AddScoped<PasswordService>();

        return services;
    }
}
