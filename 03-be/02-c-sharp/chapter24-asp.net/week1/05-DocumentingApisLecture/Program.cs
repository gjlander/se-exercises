using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
  app.UseSwaggerUi(options =>
  {
    options.DocumentPath = "/openapi/v1.json";
  });
  app.MapScalarApiReference();
}

// User Endpoints
app.MapGet("/users", () =>
{
  var users = new List<UserResponseDto>
    {
        new UserResponseDto(1, "Alice", "alice@mail"),
        new UserResponseDto(2, "Bob", "bob@mail")
    };
  return users;
})
.Produces<List<UserResponseDto>>(200)
.ProducesProblem(400)
.ProducesProblem(500);

app.MapPost("/users", (UserRequestDto user) =>
{
  var createdUser = new UserResponseDto(3, user.Name, user.Email);
  return Results.Created($"/users/{createdUser.Id}", createdUser);
});

// Post Endpoints
app.MapGet("/posts", () =>
{
  var posts = new List<PostResponseDto>
    {
        new PostResponseDto(1, "First Post", "This is the content of the first post.", 1),
        new PostResponseDto(2, "Second Post", "This is the content of the second post.", 2)
    };

  return TypedResults.Ok(posts);
});

// using Produces
app.MapGet("/posts/produces", () =>
{
  try
  {
    var posts = new List<PostResponseDto>
        {
            new PostResponseDto(1, "First Post", "This is the content of the first post.", 1),
            new PostResponseDto(2, "Second Post", "This is the content of the second post.", 2)
        };
    return TypedResults.Ok(posts);
  }
  catch (ArgumentException)
  {
    return Results.BadRequest("User not found");
  }
})
.Produces<List<PostResponseDto>>(200);

app.MapPost("/posts", (PostRequestDto post) =>
{
  var createdPost = new PostResponseDto(3, post.Title, post.Content, post.AuthorId);
  return Results.Created($"/posts/{createdPost.Id}", createdPost);
});

app.Run();

// DTOs
public record UserRequestDto(string Name, string Email);
public record UserResponseDto(int Id, string Name, string Email);
public record PostRequestDto(string Title, string Content, int AuthorId);
public record PostResponseDto(int Id, string Title, string Content, int AuthorId);