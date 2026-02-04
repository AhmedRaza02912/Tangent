using System.Text.Json.Serialization;

namespace F1Dashboard.Api.Infrastructure.Ergast.Models
{
    public class ErgastRoot
    {
        [JsonPropertyName("MRData")]
        public required ErgastMrData MRData { get; set; }
    }

    public class ErgastMrData
    {
        [JsonPropertyName("StandingsTable")]
        public required ErgastStandingsTable StandingsTable { get; set; }
    }

    public class ErgastStandingsTable
    {
        [JsonPropertyName("StandingsLists")]
        public required List<ErgastStandingsList> StandingsLists { get; set; }
    }

    public class ErgastStandingsList
    {
        [JsonPropertyName("season")]
        public required string Season { get; set; }
        
        [JsonPropertyName("round")]
        public required string Round { get; set; }

        [JsonPropertyName("DriverStandings")]
        public required List<ErgastDriverStanding> DriverStandings { get; set; }
    }

    public class ErgastDriverStanding
    {
        [JsonPropertyName("position")]
        public string? Position { get; set; }
        
        [JsonPropertyName("positionText")]
        public string? PositionText { get; set; }
        
        [JsonPropertyName("points")]
        public string? Points { get; set; }

        [JsonPropertyName("wins")]
        public string? Wins { get; set; }

        [JsonPropertyName("Driver")]
        public required ErgastDriver Driver { get; set; }
    }

    public class ErgastDriver
    {
        [JsonPropertyName("driverId")]
        public required string DriverId { get; set; }
        
        [JsonPropertyName("givenName")]
        public required string GivenName { get; set; }
        
        [JsonPropertyName("familyName")]
        public required string FamilyName { get; set; }
    }
}