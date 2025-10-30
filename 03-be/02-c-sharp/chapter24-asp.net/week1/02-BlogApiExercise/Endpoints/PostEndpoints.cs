namespace BlogApi.Endpoints;

using BlogApi.Dtos;
using BlogApi.Dtos.Posts;
using BlogApi.Services.Interfaces;
public static class PostEndpoints
{
  public static void MapPostEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/posts");
    // GET /posts
    group.MapGet("/", async (IPostService postService) =>
    {
      var posts = await postService.ListAsync();
      var postDtos = posts.Select(p => new PostResponseDto(p.Id, p.UserId, p.Title, p.Content, p.PublishedAt));
      return Results.Ok(postDtos);
    });

    // POST /posts
    group.MapPost("/", async (CreatePostDto postInfo, IPostService postService, IUserService userService, HttpContext context) =>
    {

      var foundUser = await userService.GetAsync(postInfo.UserId);
      if (foundUser is null) return Results.BadRequest();

      var newPost = await postService.CreateAsync(postInfo.UserId, postInfo.Title, postInfo.Content);
      var postDto = new PostResponseDto(newPost.Id, newPost.UserId, newPost.Title, newPost.Content, newPost.PublishedAt);

      var location = $"{context.Request.Scheme}://{context.Request.Host}/posts/{newPost.Id}";
      return Results.Created(location, newPost);

    });

    // GET /posts/{id:guid}
    group.MapGet("/{id:guid}", async (Guid id, IPostService postService) =>
    {
      var post = await postService.GetAsync(id);

      if (post is null) return Results.NotFound();

      var postDto = new PostResponseDto(post.Id, post.UserId, post.Title, post.Content, post.PublishedAt);
      return Results.Ok(postDto);
    });

    // PATCH /posts/{id:guid}
    group.MapPatch("/{id:guid}", async (Guid id, UpdatePostDto newPostInfo, IPostService postService) =>
    {
      var updatedPost = await postService.UpdateAsync(id, newPostInfo.Title, newPostInfo.Content);
      if (updatedPost is null) return Results.NotFound();


      var postDto = new PostResponseDto(updatedPost.Id, updatedPost.UserId, updatedPost.Title, updatedPost.Content, updatedPost.PublishedAt);
      return Results.Ok(updatedPost);

    });

    // DELETE /posts/{id:guid}
    group.MapDelete("/{id:guid}", async (Guid id, IPostService postService) =>
    {
      var found = await postService.DeleteAsync(id);

      if (!found) return Results.NotFound();

      return Results.NoContent();
    });
  }
}