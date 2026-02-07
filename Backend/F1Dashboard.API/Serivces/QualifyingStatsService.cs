using System.Text.Json;
using F1Dashboard.Api.Infrastructure.Ergast;
using F1Dashboard.Api.Infrastructure.Ergast.Models;

namespace F1Dashboard.Api.Services;

public class QualifyingStatsService
{
    private readonly ErgastClient _ergastClient;

    public QualifyingStatsService(ErgastClient ergastClient)
    {
        _ergastClient = ergastClient;
    }

    public async Task<Dictionary<string, int>> GetPolesAsync(int year)
    {
        var json = await _ergastClient.GetQualifyingResultsRawAsync(year);

        var root = JsonSerializer.Deserialize<ErgastRoot>(json);
        var races = root?.MRData?.RaceTable?.Races;

        var poles = new Dictionary<string, int>();

        if (races == null)
            return poles;

        foreach (var race in races)
        {
            var pole = race.QualifyingResults?
                .FirstOrDefault(q => q.Position == "1");

            if (pole == null)
                continue;

            var driverId = pole.Driver.DriverId;
            poles[driverId] = poles.GetValueOrDefault(driverId, 0) + 1;
        }

        return poles;
    }
}
