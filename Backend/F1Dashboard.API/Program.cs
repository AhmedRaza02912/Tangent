using System.Text.Json;
using F1Dashboard.Api.Infrastructure.Ergast;
using F1Dashboard.Api.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers()
.AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase; 
});

builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddHttpClient<ErgastClient>();
builder.Services.AddScoped<DriverService>();
builder.Services.AddScoped<QualifyingStatsService>();
builder.Services.AddScoped<DriverStatsService>();
builder.Services.AddScoped<NextRaceService>();
builder.Services.AddScoped<ConstructorService>();


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
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("AllowReact");

app.MapControllers();

app.Run();
