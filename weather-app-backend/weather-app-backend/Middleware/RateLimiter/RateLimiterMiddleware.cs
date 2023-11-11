using AspNetCoreRateLimit;
using Microsoft.Extensions.Options;


namespace weather_app_backend.Middleware.RateLimiter
{
    internal static class RateLimiterMiddleware
    {
        internal static IServiceCollection AddRateLimiting(this IServiceCollection services, IConfiguration configuration)
        {
            // Used to store rate limit counters and ip rules
            services.AddMemoryCache();

            // Load in general configuration from appsettings.json
            services.Configure<IpRateLimitOptions>(options => configuration.GetSection("RateLimitingSettings").Bind(options));

            // Inject Counter and Store Rules
            services.AddSingleton<IRateLimitConfiguration, APIKeyLimiter>();
            services.AddInMemoryRateLimiting();

            // Return the services
            return services;
        }

        internal static IApplicationBuilder UseRateLimiting(this IApplicationBuilder app)
        {
            app.UseIpRateLimiting();
            return app;
        }
    }
}

