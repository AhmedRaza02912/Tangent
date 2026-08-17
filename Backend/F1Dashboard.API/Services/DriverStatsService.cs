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
        // GetAllRacesPaginatedAsync pages through the Jolpica API 100 rows at
        // a time to work around the server-side row cap (~200 rows = ~10 races).
        return await _ergast.GetAllRacesPaginatedAsync();
    }

    public async Task<Dictionary<string, int>> GetDnfsAsync()
        => GetDnfs(await GetAllRaceResultsAsync() ?? []);

    public Task<Dictionary<string, int>> GetDnfsAsync(List<ErgastRace> races)
        => Task.FromResult(GetDnfs(races));

    private static Dictionary<string, int> GetDnfs(List<ErgastRace> races)
    {
        var dnfs = new Dictionary<string, int>();
        foreach (var race in races)
        {
            if (race.Results == null) continue;
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
        => GetRaceWins(await GetAllRaceResultsAsync() ?? []);

    public Task<Dictionary<string, int>> GetRaceWinsAsync(List<ErgastRace> races)
        => Task.FromResult(GetRaceWins(races));

    private static Dictionary<string, int> GetRaceWins(List<ErgastRace> races)
    {
        var wins = new Dictionary<string, int>();
        foreach (var race in races)
        {
            if (race.Results == null) continue;
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
