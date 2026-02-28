using System.Text.Json;
using F1Dashboard.Api.DTOs;
using F1Dashboard.Api.Infrastructure.Ergast;
using F1Dashboard.Api.Infrastructure.Ergast.Models;

namespace F1Dashboard.Api.Services;

public class NextRaceService
{
    private readonly ErgastClient _ergastClient;

    public NextRaceService(ErgastClient ergastClient)
    {
        _ergastClient = ergastClient;
    }

    public async Task<NextRaceDto?> GetNextRaceAsync(int year = 2026)
    {
        var json = await _ergastClient.GetNextRaceRawAsync(year);
        var root = JsonSerializer.Deserialize<ErgastRoot>(json);

        var race = root?.MRData?.RaceTable?.Races?.FirstOrDefault();

        if(race == null)
        {
            return null;
        }

        return new NextRaceDto
        {
            RaceName = race.RaceName,
            Circuit = race.Circuit.CircuitName,
            Country = race.Circuit.Location.Country,
            Date = race.Date,
            Time = race.Time ?? "00:00:00Z",
            Round = int.Parse(race.Round)
        };
    }
}