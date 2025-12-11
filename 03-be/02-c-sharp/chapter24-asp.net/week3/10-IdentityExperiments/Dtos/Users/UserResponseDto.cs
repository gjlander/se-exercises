namespace TravelApi.Dtos.Users;

public record UserResponseDto(Guid Id, string FirstName, string LastName, string Email, DateTimeOffset CreatedAt);