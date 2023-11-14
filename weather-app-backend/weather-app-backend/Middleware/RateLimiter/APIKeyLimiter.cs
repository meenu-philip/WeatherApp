using AspNetCoreRateLimit;
using Microsoft.Extensions.Options;

namespace weather_app_backend.Middleware.RateLimiter
{

    internal class APIKeyLimiter : RateLimitConfiguration
    {
        public APIKeyLimiter(
            IOptions<IpRateLimitOptions> ipOptions,
            IOptions<ClientRateLimitOptions> clientOptions) : base(ipOptions, clientOptions)
        {
        }

        public override void RegisterResolvers()
        {
            ClientResolvers.Add(new ClientIdResolverContributor());
        }
    }

    internal class ClientIdResolverContributor : IClientResolveContributor
    {
        public Task<string> ResolveClientAsync(HttpContext httpContext)
        {
            var key = Task.FromResult<string>(httpContext.Request.Headers.TryGetValue("AuthKey", out var value) ? value.First() : null);

            return key;
        }
    }
}
