using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace weather_app_backend
{
    public class QueryParameters
    {
        [BindRequired]
        public string City { get; set; }
        [BindRequired]
        public string Country { get; set; }
    }
}