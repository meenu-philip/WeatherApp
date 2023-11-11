using Microsoft.AspNetCore.RateLimiting;
using weather_app_backend.Middleware.APIKeyAuthentication;
using weather_app_backend.Middleware.RateLimiter;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add Rate Limiting
builder.Services.AddRateLimiting(builder.Configuration);


// Rate Limiter
//builder.Services.AddRateLimiter(options => {
//    options.RejectionStatusCode = 429;
//    options.AddFixedWindowLimiter(policyName: "fixed", options => {
//        options.PermitLimit = 2;
//        options.Window = TimeSpan.FromSeconds(10);
//        options.AutoReplenishment = true;
//    });
//});

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseRateLimiter();

// Use API Authentication
app.UseMiddleware<APIKeyMiddleware>();

// Use Rate Limiting
app.UseRateLimiting();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
