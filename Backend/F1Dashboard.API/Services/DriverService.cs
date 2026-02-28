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

    public async Task<List<DriverStandingDto>> GetDriverStandingsAsync(int year = 2024)
    {
        var json = await _ergastClient.GetDriverStandingsRawAsync(year);

        var root = JsonSerializer.Deserialize<ErgastRoot>(json);
        var standings = root?.MRData?.StandingsTable?.StandingsLists?[0]?.DriverStandings;
        var poles = await _qualifyingStats.GetPolesAsync(year);
        var dnfs = await _driverStatsService.GetDnfsAsync(year);


        if (standings == null || standings.Count == 0)
            return new();

        return standings
            .OrderByDescending(s => ParseOrZero(s.Points))
            .Select(s => new DriverStandingDto
            {
                Name = $"{s.Driver.GivenName} {s.Driver.FamilyName}",
                Points = ParseOrZero(s.Points),
                Wins = ParseOrZero(s.Wins),
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
