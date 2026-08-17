using System.Text.Json;
using F1Dashboard.API.DTOs;
using F1Dashboard.Api.Infrastructure.Ergast;
using F1Dashboard.Api.Infrastructure.Ergast.Models;

namespace F1Dashboard.Api.Services;

public class DriverService
{
    private readonly QualifyingStatsService _qualifyingStats;
    private readonly ErgastClient _ergastClient;
    private readonly DriverStatsService _driverStatsService;
    public DriverService(
        ErgastClient ergastClient,
        QualifyingStatsService qualifyingStats,
        DriverStatsService driverStatsService)
    {
        _ergastClient = ergastClient;
        _qualifyingStats = qualifyingStats;
        _driverStatsService = driverStatsService;
    }

    public async Task<List<DriverStandingDto>> GetDriverStandingsAsync()
    {
        var json = await _ergastClient.GetDriverStandingsRawAsync();

        var root = JsonSerializer.Deserialize<ErgastRoot>(json);
        var standings = root?.MRData?.StandingsTable?.StandingsLists?[0]?.DriverStandings;
        var poles = await _qualifyingStats.GetPolesAsync();
        // Fetch all race results ONCE and pass to both stat methods.
        // Previously each method independently ran 9 paginated HTTP calls (242 rows ÷ 30/page),
        // totalling 18 sequential requests which caused timeouts.
        var allRaces = await _ergastClient.GetAllRacesPaginatedAsync();
        var dnfs     = await _driverStatsService.GetDnfsAsync(allRaces);
        var raceWins = await _driverStatsService.GetRaceWinsAsync(allRaces);


        if (standings == null || standings.Count == 0)
            return new();

        return standings
            .OrderByDescending(s => ParseOrZero(s.Points))
            .Select(s => new DriverStandingDto
            {
                Name = $"{s.Driver.GivenName} {s.Driver.FamilyName}",
                Points = ParseOrZero(s.Points),
                Wins = raceWins.GetValueOrDefault(s.Driver.DriverId, 0),
                Poles = poles.GetValueOrDefault(s.Driver.DriverId, 0),
                Dnfs = dnfs.GetValueOrDefault(s.Driver.DriverId, 0),
                ImageKey = s.Driver.DriverId
            })
            .ToList();
    }

    private static int ParseOrZero(string? value)
    {
        return int.TryParse(value, out var parsed) ? parsed : 0;
    }
}
