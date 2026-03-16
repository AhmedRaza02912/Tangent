using System.Text.Json;
using F1Dashboard.Api.Infrastructure.Ergast;
using F1Dashboard.Api.Infrastructure.Ergast.Models;

public class RaceResultService
{
    private readonly ErgastClient _ergastClient;

    public RaceResultService(ErgastClient ergastClient)
    {
        _ergastClient = ergastClient;
    }

    public async Task<List<RaceResultsDto>> GetLastRaceResultsAsync()
    {
        try
        {
            var json = await _ergastClient.GetLastRaceResultsRawAsync();

            // // Check if response is HTML instead of JSON
            // if (json.TrimStart().StartsWith('<'))
            // {
            //     Console.WriteLine("Received HTML instead of JSON");
            //     return new List<RaceResultsDto>();
            // }
            var root = JsonSerializer.Deserialize<ErgastRoot>(json);

            var race = root?.MRData?.RaceTable?.Races?.FirstOrDefault();

            if (race?.Results == null || !race.Results.Any())
            {
                return new List<RaceResultsDto>();
            }
            return race.Results
                .Where(r => r.Driver != null)  
                .Select(r =>
                {
                    string gap;

                    if (r.Position == "1")
                    {
                        gap = "Winner";
                    }
                    else if (r.Time?.Time != null)
                    {
                        gap = r.Time.Time;
                    }
                    else
                    {
                        gap = r.Status ?? "DNF";
                    }

                    return new RaceResultsDto
                    {
                        DriverId = r.Driver.DriverId,
                        Name = $"{r.Driver.GivenName} {r.Driver.FamilyName}",
                        Constructor = r.Constructor?.Name ?? "Unknown",
                        Position = r.Position ?? r.Status ?? "N/A",
                        Gap = gap
                    };

                }).ToList();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error in GetLastRaceResultsAsync: {ex.Message}");
            return new List<RaceResultsDto>();
        }
    }
}