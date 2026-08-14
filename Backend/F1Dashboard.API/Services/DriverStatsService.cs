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

    // Fetches all race results once and returns parsed races, shared by both
    // GetDnfsAsync and GetRaceWinsAsync to avoid duplicate HTTP calls.
    private async Task<List<ErgastRace>?> GetAllRaceResultsAsync()
    {
        var json = await _ergast.GetRaceResultsRawAsync();
        var root = JsonSerializer.Deserialize<ErgastRoot>(json);
        return root?.MRData?.RaceTable?.Races;
    }

    public async Task<Dictionary<string, int>> GetDnfsAsync()
    {
        var races = await GetAllRaceResultsAsync();
        var dnfs = new Dictionary<string, int>();

        if (races == null)
            return dnfs;

        foreach (var race in races)
        {
            if (race.Results == null)
                continue;

            foreach (var result in race.Results)
            {
                // positionText "R" is the authoritative Ergast signal for a DNF.
                // Status can be "Retired", "Lapped", "+1 Lap" etc. and is not reliable for this check.
                // A driver classified as Finished has a numeric positionText even with no time recorded.
                if (result.PositionText == "R")
                {
                    var driverId = result.Driver.DriverId;
                    dnfs[driverId] = dnfs.GetValueOrDefault(driverId, 0) + 1;
                }
            }
        }

        return dnfs;
    }

    /// <summary>
    /// Counts race wins (P1 in a Grand Prix) sourced directly from the race results
    /// endpoint. This intentionally excludes sprint wins, which the Ergast
    /// driverStandings `wins` field incorrectly bundles in some seasons.
    /// </summary>
    public async Task<Dictionary<string, int>> GetRaceWinsAsync()
    {
        var races = await GetAllRaceResultsAsync();
        var wins = new Dictionary<string, int>();

        if (races == null)
            return wins;

        foreach (var race in races)
        {
            if (race.Results == null)
                continue;

            var winner = race.Results.FirstOrDefault(r => r.Position == "1");
            if (winner != null)
            {
                var driverId = winner.Driver.DriverId;
                wins[driverId] = wins.GetValueOrDefault(driverId, 0) + 1;
            }
        }

        return wins;

        
    }
}
