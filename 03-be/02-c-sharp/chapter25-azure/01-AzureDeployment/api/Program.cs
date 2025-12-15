var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(
                    policy =>
                    {
                      policy.WithOrigins("*")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    });
});
var app = builder.Build();

app.UseCors();

app.MapGet("/message", () => new { message = "Hello Azure!" });

app.Run();
