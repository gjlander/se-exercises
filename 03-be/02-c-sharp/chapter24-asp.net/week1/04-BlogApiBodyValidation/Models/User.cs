namespace BlogApi.Models;

public class User(string name, string email)
{
  public Guid Id { get; } = Guid.NewGuid();
  public string Name { get; set; } = name;
  public string Email { get; set; } = email;
  public DateTimeOffset CreatedAt { get; } = DateTimeOffset.UtcNow;
}