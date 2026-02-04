using System.Text.Json;
using F1Dashboard.Api.Infrastructure.Ergast;
using F1Dashboard.Api.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers()
.AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase; 
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<DriverService>();
builder.Services.AddHttpClient<ErgastClient>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});
var app = builder.Build();


app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("AllowReact");

app.MapControllers();

app.Run();
