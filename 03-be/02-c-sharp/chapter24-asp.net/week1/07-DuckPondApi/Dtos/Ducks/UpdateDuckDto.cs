using System.ComponentModel.DataAnnotations;

namespace DuckPondApi.Dtos.Posts;

public record UpdatePostDto(

    [property: StringLength(255, MinimumLength = 1)]
    string? Name,

    [property: StringLength(1_000, MinimumLength = 1)]
    string? Quote,

    [property: StringLength(510, MinimumLength = 1)]
    string? Image
);