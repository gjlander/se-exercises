using BlogApi.Endpoints;
using BlogApi.Services;
using BlogApi.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IUserService, InMemoryUserService>();
builder.Services.AddSingleton<IPostService, InMemoryPostService>();


var app = builder.Build();

app.MapUserEndpoints();
app.MapPostEndpoints();

app.Run();
