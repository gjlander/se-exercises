using Microsoft.AspNetCore.Identity;

namespace TravelApi.Models;

public class User : IdentityUser<Guid>
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public ICollection<Post> Posts { get; set; } = new List<Post>();
}