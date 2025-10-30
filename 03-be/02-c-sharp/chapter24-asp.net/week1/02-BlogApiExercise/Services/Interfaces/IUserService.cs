namespace BlogApi.Services.Interfaces;

using BlogApi.Models;

public interface IUserService
{
  Task<User?> GetAsync(Guid id);
  Task<IReadOnlyList<User>> ListAsync();
  Task<User> CreateAsync(string name, string email);
  Task<User?> UpdateAsync(Guid id, string? name, string? email);
  Task<bool> DeleteAsync(Guid id);
}