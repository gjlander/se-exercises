namespace BlogApi.Models;

public class Post(Guid userId, string title, string content)
{
  public Guid Id { get; } = Guid.NewGuid();
  public Guid UserId { get; set; } = userId;
  public string Title { get; set; } = title;
  public string Content { get; set; } = content;
  public DateTimeOffset PublishedAt { get; } = DateTimeOffset.UtcNow;
}