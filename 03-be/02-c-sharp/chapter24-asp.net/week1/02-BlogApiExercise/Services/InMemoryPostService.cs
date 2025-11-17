namespace BlogApi.Services;

using BlogApi.Services.Interfaces;
using BlogApi.Models;

public sealed class InMemoryPostService : IPostService
{
  private readonly Dictionary<Guid, Post> _posts = [];

  public async Task<Post?> GetAsync(Guid id)
  {
    _posts.TryGetValue(id, out Post? post);
    return post;
  }

  public async Task<IReadOnlyList<Post>> ListAsync()
  {
    return [.. _posts.Values];
    // return Task.FromResult<IReadOnlyList<Post>>(_posts.Values.ToList());
  }
  public async Task<IReadOnlyList<Post>> ListByUserAsync(Guid userId)
  {
    return _posts.Values.Where(p => p.UserId == userId).ToList();
    ;
  }

  public async Task<Post> CreateAsync(Guid userId, string title, string content)
  {
    var newPost = new Post(userId, title, content);
    _posts[newPost.Id] = newPost;
    return newPost;
  }

  public async Task<Post?> UpdateAsync(Guid id, string? title, string? content)
  {
    if (!_posts.ContainsKey(id)) return null;

    var post = _posts[id];

    if (title is not null) post.Title = title;
    if (content is not null) post.Content = content;

    return post;
  }

  public async Task<bool> DeleteAsync(Guid id)
  {
    if (!_posts.ContainsKey(id)) return false;
    _posts.Remove(id);
    return true;
  }
}