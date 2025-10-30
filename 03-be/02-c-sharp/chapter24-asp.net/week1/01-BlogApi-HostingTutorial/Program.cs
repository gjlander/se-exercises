using Microsoft.AspNetCore.Mvc;
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSingleton<TimeService>();

var app = builder.Build();

// Program.cs - Start //////////////////////////////
var appName = builder.Configuration["AppName"] ?? "Default App";
var greeting = builder.Configuration["Greeting"] ?? "Hi";

app.MapGet("/time", (TimeService ts) => ts.Now());
app.MapGet("/config", () => $"{appName} says: {greeting}");
// Program.cs - End //////////////////////////////////

// Middleware - Start ///////////////////////////
app.Use(async (context, next) =>
{
  Console.WriteLine("Request starting");
  await next();
  Console.WriteLine("Response sent");
});

app.UseStaticFiles();

app.UseRouting();

app.Use(async (context, next) =>
{
  if (context.Request.Path == "/forbidden")
  {
    context.Response.StatusCode = 403;
    await context.Response.WriteAsync("Forbidden");
  }
  else
  {
    await next();
  }
});

app.MapGet("/", () => "Hello from middleware pipeline!");
// Middleware - End //////////////////////////

// Endpoint Routing - Start /////////////////////////////
// Users endpoints
app.MapGet("/users", () => new[] { "Alice", "Bob" });
app.MapGet("/users/{id:int}", (int id) => $"User {id}");
// app.MapPost("/users", (UserRequestDto user) => $"Created user {user.Name}");
app.MapPost("/users", (UserRequestDto user) =>
{
  return Results.Ok($"Welcome, {user.Name}!");
});

// Posts endpoints
app.MapGet("/posts", () => new[] { "Post 1", "Post 2" });
// app.MapGet("/posts/{id}", (int id) => $"Post {id}");
app.MapPost("/posts", (PostRequestDto post) => $"Created post {post.Title}");

app.MapGet("/posts/search", (string term) => $"You searched for posts with: {term}");

app.MapPost("/echo", ([FromBody] string message) => Results.Ok(message));


var api = app.MapGroup("/api");

api.MapGet("/users", () => new[] { "Alice", "Bob" });
api.MapGet("/posts", () => new[] { "Post 1", "Post 2" });
// Endpoint Routing - End /////////////////////////////


app.Run();