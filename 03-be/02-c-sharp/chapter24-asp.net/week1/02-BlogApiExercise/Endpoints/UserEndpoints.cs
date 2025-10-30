namespace BlogApi.Endpoints;

using BlogApi.Dtos.Posts;
using BlogApi.Dtos.Users;
using BlogApi.Services.Interfaces;
public static class UserEndpoints
{
  public static void MapUserEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/users");
    // GET /users
    group.MapGet("/", async (IUserService userService) =>
    {
      var users = await userService.ListAsync();
      var userDtos = users.Select(u => new UserResponseDto(u.Id, u.Name, u.Email, u.CreatedAt));
      return Results.Ok(userDtos);
    });

    // POST /users
    group.MapPost("/", async (CreateUserDto userInfo, IUserService userService, HttpContext context) =>
    {
      var newUser = await userService.CreateAsync(userInfo.Name, userInfo.Email);
      var userDto = new UserResponseDto(newUser.Id, newUser.Name, newUser.Email, newUser.CreatedAt);
      var location = $"{context.Request.Scheme}://{context.Request.Host}/users/{newUser.Id}";
      return Results.Created(location, newUser);

    });

    // GET /users/{id:guid}
    group.MapGet("/{id:guid}", async (Guid id, IUserService userService) =>
    {
      var user = await userService.GetAsync(id);

      if (user is null) return Results.NotFound();

      var userDto = new UserResponseDto(user.Id, user.Name, user.Email, user.CreatedAt);
      return Results.Ok(userDto);
    });

    // POST /users/{id:guid}
    group.MapPatch("/{id:guid}", async (Guid id, UpdateUserDto newUserInfo, IUserService userService) =>
    {
      var updatedUser = await userService.UpdateAsync(id, newUserInfo.Name, newUserInfo.Email);
      if (updatedUser is null) return Results.NotFound();


      var userDto = new UserResponseDto(updatedUser.Id, updatedUser.Name, updatedUser.Email, updatedUser.CreatedAt);
      return Results.Ok(updatedUser);

    });

    // DELETE /users/{id:guid}
    group.MapDelete("/{id:guid}", async (Guid id, IUserService userService, IPostService postService) =>
    {
      var found = await userService.DeleteAsync(id);

      if (!found) return Results.NotFound();

      var posts = await postService.ListByUserAsync(id);

      foreach (var post in posts)
      {
        await postService.DeleteAsync(post.Id);
      }

      return Results.NoContent();
    });


    // GET /users/{id:guid}/posts
    group.MapGet("/{id:guid}/posts", async (Guid id, IPostService postService) =>
    {
      var posts = await postService.ListByUserAsync(id);

      var postDtos = posts.Select(p => new PostResponseDto(p.Id, p.UserId, p.Title, p.Content, p.PublishedAt));
      return Results.Ok(postDtos);
    });
  }
}