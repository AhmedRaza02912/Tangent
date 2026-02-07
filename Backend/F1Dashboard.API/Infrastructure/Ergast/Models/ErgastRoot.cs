
// To clean out duplication logic I removed ErgastRace and ErgadtQualifying models
// Now a single file consists of all code.

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
        public ErgastStandingsTable? StandingsTable { get; set; }

        [JsonPropertyName("RaceTable")]
        public ErgastRaceTable? RaceTable { get; set; }
    }

    // ---------------- STANDINGS ----------------

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
        public List<ErgastDriverStanding> DriverStandings { get; set; }

        [JsonPropertyName("ConstructorStandings")]
        public List<ErgastConstructorStanding> ConstructorStandings { get; set; }
    }

    public class ErgastConstructorStanding
    {
        [JsonPropertyName("position")]
        public string? Position { get; set; }

        [JsonPropertyName("points")]
        public string? Points { get; set; }

        [JsonPropertyName("wins")]
        public string? Wins { get; set; }

        [JsonPropertyName("Constructor")]
        public required ErgastConstructor Constructor { get; set; }
    }

    public class ErgastConstructor
    {
        [JsonPropertyName("constructorId")]
        public required string ConstructorId { get; set; }

        [JsonPropertyName("name")]
        public required string Name {get; set;}
    }
    public class ErgastDriverStanding
    {
        [JsonPropertyName("position")]
        public string? Position { get; set; }

        [JsonPropertyName("points")]
        public string? Points { get; set; }

        [JsonPropertyName("wins")]
        public string? Wins { get; set; }

        [JsonPropertyName("Driver")]
        public required ErgastDriver Driver { get; set; }
    }

    // ---------------- RACES ----------------

    public class ErgastRaceTable
    {
        [JsonPropertyName("Races")]
        public required List<ErgastRace> Races { get; set; }
    }

    public class ErgastRace
    {
        [JsonPropertyName("round")]
        public required string Round { get; set; }

        [JsonPropertyName("QualifyingResults")]
        public List<ErgastQualifyingResult>? QualifyingResults { get; set; }

        [JsonPropertyName("Results")]
        public List<ErgastRaceResult>? Results { get; set; }
    }

    public class ErgastQualifyingResult
    {
        [JsonPropertyName("position")]
        public required string Position { get; set; }

        [JsonPropertyName("Driver")]
        public required ErgastDriver Driver { get; set; }
    }

    public class ErgastRaceResult
    {
        [JsonPropertyName("status")]
        public required string Status { get; set; }

        [JsonPropertyName("Driver")]
        public required ErgastDriver Driver { get; set; }
    }

    // ---------------- DRIVER ----------------

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
