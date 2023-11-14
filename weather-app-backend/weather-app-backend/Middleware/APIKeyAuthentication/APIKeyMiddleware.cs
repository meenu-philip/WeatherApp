using System.Collections;
using System.Linq;

namespace weather_app_backend.Middleware.APIKeyAuthentication
{
    public class APIKeyMiddleware
    {
        private readonly RequestDelegate _next;
        private
        const string APIKEY = "AuthKey";
        public APIKeyMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            if (!context.Request.Headers.TryGetValue(APIKEY, out
                    var extractedApiKey))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Api Key was not provided ");
                return;
            }
            var appSettings = context.RequestServices.GetRequiredService<IConfiguration>();
            string[] apiKeys = appSettings.GetSection("AuthKeys").GetChildren().ToArray().Select(c => c.Value).ToArray();
            if (!((IList)apiKeys).Contains(extractedApiKey.ToString()))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Unauthorized client");
                return;
            }

            await _next(context);
        }
    }
}

