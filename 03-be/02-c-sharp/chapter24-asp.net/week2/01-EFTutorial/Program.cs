
using Scalar.AspNetCore;
using BlogApi.Endpoints;
using BlogApi.Services;
using BlogApi.Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// In Memory Services
// builder.Services.AddSingleton<IUserService, InMemoryUserService>();
// builder.Services.AddSingleton<IPostService, InMemoryPostService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.MapUserEndpoints();
app.MapPostEndpoints();

app.Run();
