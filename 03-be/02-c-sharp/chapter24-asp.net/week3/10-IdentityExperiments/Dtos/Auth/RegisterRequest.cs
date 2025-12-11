using System.ComponentModel.DataAnnotations;

namespace TravelApi.Dtos.Auth;

public class RegisterRequestDto
{
  [Required]
  [StringLength(100, MinimumLength = 1)]
  public string FirstName { get; set; } = string.Empty;

  [Required]
  [StringLength(100, MinimumLength = 1)]
  public string LastName { get; set; } = string.Empty;

  [Required, EmailAddress]
  public string Email { get; set; } = string.Empty;

  [Required, MinLength(6)]
  public string Password { get; set; } = string.Empty;
}