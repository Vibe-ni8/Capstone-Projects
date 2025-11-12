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
using Microsoft.OpenApi.Models;

namespace Darkwolf.AuthService.Solution.Utils.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection RegisterSwaggerGen(
        this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            // Add JWT bearer definition
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = "Bearer"
            });

            // Add global security requirement
            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            });
        });

        return services;
    }

    public static IServiceCollection RegisterServices(
        this IServiceCollection services, IConfigurationManager configuration)
    {
        services.AddDarkwolfShared(
            configuration.GetSection(AppSettingKey.JwtSettings).Get<JwtSettings>() ?? 
            throw new InvalidOperationException(ExceptionMessage.JwtNotConfigured),
            configuration.GetSection(AppSettingKey.DarkwolfEmailConfig).Get<DarkwolfEmailConfig>() ??
            throw new InvalidOperationException(ExceptionMessage.DarkwolfEmailNotConfigured)
        );

        services.AddHttpContextAccessor();
        services.Configure<PasswordSettings>(configuration.GetSection(AppSettingKey.PasswordSettings));

        var connectionString = configuration.GetConnectionString(AppSettingKey.DefaultConnection) 
            ?? throw new InvalidOperationException(ExceptionMessage.ConnectionStringNotConfigured);
        services.AddDbContext<AuthDbContext>(options => options
        .UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

        services.AddScoped<IEmployeeRepository, EmployeeRepository>();

        services.AddScoped<TokenService>();
        services.AddScoped<PasswordService>();
        services.AddScoped<UserProviderService>();

        return services;
    }
}
