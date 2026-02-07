namespace F1Dashboard.Api.DTOs;

public class ConstructorStandingDto
{
    public required string? Position { get; set; }
    public required string Name { get; set; }
    public int Points { get; set; }
    public int Wins { get; set; }
    public string constructorId { get; set; } = string.Empty;

    public string constructorImage {get; set;} = string.Empty;
}