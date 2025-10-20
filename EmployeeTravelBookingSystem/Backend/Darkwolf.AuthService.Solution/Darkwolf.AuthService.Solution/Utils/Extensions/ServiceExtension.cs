using Darkwolf.AuthService.Solution.Data;
using Darkwolf.AuthService.Solution.Data.Interface;
using Darkwolf.AuthService.Solution.Data.Repositories;
using Darkwolf.AuthService.Solution.Service;
using Darkwolf.AuthService.Solution.Utils.Common;
using Darkwolf.AuthService.Solution.Utils.Settings;
using Darkwolf.Shared.Authentication.Models;
using Darkwolf.Shared.Extensions;
using Darkwolf.Shared.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace Darkwolf.AuthService.Solution.Utils.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection RegisterServices(
        this IServiceCollection services, IConfigurationManager configuration)
    {
        services.AddDarkwolfShared(
            configuration.GetSection(AppSettingKey.JwtSettings).Get<JwtSettings>() ?? 
            throw new InvalidOperationException(ExceptionMessage.JwtNotConfigured),
            configuration.GetSection(AppSettingKey.DarkwolfEmailConfig).Get<DarkwolfEmailConfig>() ??
            throw new InvalidOperationException(ExceptionMessage.DarkwolfEmailNotConfigured)
        );

        var connectionString = configuration.GetConnectionString(AppSettingKey.DefaultConnection) 
            ?? throw new InvalidOperationException(ExceptionMessage.ConnectionStringNotConfigured);

        services.AddDbContext<AuthDbContext>(options => options
        .UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

        services.AddScoped<IEmployeeRepository, EmployeeRepository>();
        services.AddScoped<UserService>();

        services.Configure<PasswordSettings>(configuration.GetSection(AppSettingKey.PasswordSettings));
        services.AddScoped<PasswordService>();

        return services;
    }
}
