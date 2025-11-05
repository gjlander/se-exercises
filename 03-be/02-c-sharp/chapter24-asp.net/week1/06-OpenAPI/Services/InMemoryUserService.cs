namespace BlogApi.Services;

using BlogApi.Services.Interfaces;
using BlogApi.Models;

public sealed class InMemoryUserService : IUserService
{
  private readonly Dictionary<Guid, User> _users = [];

  public async Task<User?> GetAsync(Guid id)
  {
    _users.TryGetValue(id, out User? user);
    return user;
  }

  public async Task<IReadOnlyList<User>> ListAsync()
  {
    return [.. _users.Values];
  }

  public async Task<User> CreateAsync(string name, string email)
  {
    var newUser = new User(name, email);
    _users[newUser.Id] = newUser;
    return newUser;
  }

  public async Task<User?> UpdateAsync(Guid id, string? name, string? email)
  {
    if (!_users.ContainsKey(id)) return null;

    var user = _users[id];

    if (name is not null) user.Name = name;
    if (email is not null) user.Email = email;

    return user;
  }

  public async Task<bool> DeleteAsync(Guid id)
  {
    if (!_users.ContainsKey(id)) return false;
    _users.Remove(id);
    return true;
  }
}