using Darkwolf.AuthService.Solution.Utils.Extensions;
using Darkwolf.Shared.Authentication;
using Darkwolf.Shared.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.RegisterSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services.RegisterServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseDarkwolfRequestLogging();

app.UseDarkwolfGlobalException();

app.UseHttpsRedirection();

app.MapWhen(context => context.Request.Path.StartsWithSegments("/api/auth"), appBuilder =>
{
    // No auth middleware here
    appBuilder.UseRouting();
    appBuilder.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers(); // or Map specific endpoints
    });
});

app.UseDarkwolfAuth();

app.MapControllers();

app.Run();