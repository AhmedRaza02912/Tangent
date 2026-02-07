using System.Text.Json;
using F1Dashboard.Api.Infrastructure.Ergast;
using F1Dashboard.Api.Infrastructure.Ergast.Models;

namespace F1Dashboard.Api.Services;

public class DriverStatsService
{
    private readonly ErgastClient _ergast;

    public DriverStatsService(ErgastClient ergast)
    {
        _ergast = ergast;
    }

    public async Task<Dictionary<string, int>> GetDnfsAsync(int year)
    {
        var json = await _ergast.GetRaceResultsRawAsync(year);

        var root = JsonSerializer.Deserialize<ErgastRoot>(json);

        var races = root?.MRData?.RaceTable?.Races;
        var dnfs = new Dictionary<string, int>();

        if (races == null)
            return dnfs;

        foreach (var race in races)
        {
            if (race.Results == null)
                continue;

            foreach (var result in race.Results)
            {
                if (result.Status == "Retired")
                {
                    var driverId = result.Driver.DriverId;
                    dnfs[driverId] = dnfs.GetValueOrDefault(driverId, 0) + 1;
                }
            }
        }

        return dnfs;
    }
}
