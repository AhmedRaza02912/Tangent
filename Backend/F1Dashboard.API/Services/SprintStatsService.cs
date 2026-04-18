using System.Text.Json;
using F1Dashboard.Api.Infrastructure.Ergast;
using F1Dashboard.Api.Infrastructure.Ergast.Models;

namespace F1Dashboard.Api.Services;

public class SprintStatsService
{
    private readonly ErgastClient _ergast;

    public SprintStatsService(ErgastClient ergast)
    {
        _ergast = ergast;
    }

    public async Task<(int winsA, int winsB,
     int podiumsA, int podiumsB)>
     GetStringComparison(string driverA, string driverB)
    {
        var json = await _ergast.GetSprintResultsRawAsync();
        var root = JsonSerializer.Deserialize<ErgastRoot>(json,
        new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        int winsA = 0;
        int winsB = 0;
        int podiumsA = 0;
        int podiumsB = 0;

        foreach (var race in root?.MRData?.RaceTable?.Races ?? [])
        {
            var results = race.SprintResults;
            if(race.SprintResults == null)
            continue;

            var a = results.FirstOrDefault(x => x.Driver.DriverId == driverA);
            var b = results.FirstOrDefault(x => x.Driver.DriverId == driverB);

            if( a != null && int.TryParse(a.Position, out int posA))
            {
                if(posA == 1) winsA++;
                if(posA <= 3) podiumsA++;
            }

            if( b != null && int.TryParse(b.Position, out int posB))
            {
                if(posB == 1) winsB++;
                if(posB <= 3) podiumsB++;
            }
        }
        Console.WriteLine(root?.MRData?.RaceTable?.Races?.Count);

        return (winsA, winsB, podiumsA, podiumsB);
    }

    public async Task<string> GetRawJson()
{
    return await _ergast.GetSprintResultsRawAsync();
}

}