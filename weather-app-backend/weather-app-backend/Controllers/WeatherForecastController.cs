using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Web;

namespace weather_app_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableRateLimiting("fixed")]
    public class WeatherForecastController : ControllerBase
    {
        static readonly string _address = "https://api.openweathermap.org/data/2.5/weather"; // external uri

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        static private async Task<string> GetExternalResponse(string url)
        {
            var client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(url);
            var data = await response.Content.ReadAsStringAsync();
            var result = new Result
            {
                description = "",
                error = false
            };

            try {
                if (response.IsSuccessStatusCode)
                { 
                    var descriptionValue = JObject.Parse(data)
                        .DescendantsAndSelf()
                        .OfType<JProperty>()
                        .Single(x => x.Name.Equals("description")).Value;
                    result.description = descriptionValue.ToString();
                }
                else
                {
                    result.error = true;
                }
            }
            catch (Exception error)
            {
                result.error = true;
            }
            return JsonConvert.SerializeObject(result);
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<string> Get([FromQuery] QueryParameters parameters)
        {
            Ok(new[] { parameters.City, parameters.Country });

            //append query parameters to Weather API
            var builder = new UriBuilder(_address);
            builder.Port = -1;
            var query = HttpUtility.ParseQueryString(builder.Query);
            query["q"] = parameters.City + "," + parameters.Country;
            var appSettings = HttpContext.RequestServices.GetRequiredService<IConfiguration>();
            query["appid"] = appSettings.GetValue<string>("OpenWeatherKey"); builder.Query = query.ToString();
            string url = builder.ToString();

            var result = await GetExternalResponse(url);
            return result;

        }
    }
}