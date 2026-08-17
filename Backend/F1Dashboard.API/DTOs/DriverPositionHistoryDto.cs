namespace F1Dashboard.API.DTOs;

public class DriverPositionHistoryDto
{
    public string DriverId { get; set; } = string.Empty;
    public string DriverName { get; set; } = string.Empty;
    public string Constructor { get; set; } = string.Empty;
    public string ConstructorId { get; set; } = string.Empty;
    public List<RacePositionDto> Races { get; set; } = [];
}

public class RacePositionDto
{
    public int Round { get; set; }
    public string RaceName { get; set; } = string.Empty;
    public string CircuitName { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    /// <summary>Numeric finish position, or null if the driver retired (DNF).</summary>
    public int? Position { get; set; }
    public bool Dnf { get; set; }
}
