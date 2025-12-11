using TravelApi.Models;

namespace TravelApi.Services;

public interface IUserService
{
    Task<User?> GetAsync(Guid id);
    Task<IReadOnlyList<User>> ListAsync();
    Task<User> CreateAsync(string firstName, string lastName, string email);
    Task<User?> UpdateAsync(Guid id, string? firstName, string? lastName, string? email);
    Task<bool> DeleteAsync(Guid id);
}