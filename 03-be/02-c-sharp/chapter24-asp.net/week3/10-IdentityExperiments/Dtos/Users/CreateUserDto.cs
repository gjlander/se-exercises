using System.ComponentModel.DataAnnotations;

namespace TravelApi.Dtos.Users;

public record CreateUserDto(
    [property: Required]
    [property: StringLength(100, MinimumLength = 1)]
    string FirstName,

    [property: Required]
    [property: StringLength(100, MinimumLength = 1)]
    string LastName,

    [property: Required]
    [property: EmailAddress]
    string Email
);