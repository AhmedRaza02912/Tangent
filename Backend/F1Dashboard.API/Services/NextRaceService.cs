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

    public async Task<NextRaceDto?> GetNextRaceAsync()
    {
        var json = await _ergastClient.GetNextRaceRawAsync();
        var root = JsonSerializer.Deserialize<ErgastRoot>(json);

        var race = root?.MRData?.RaceTable?.Races?.FirstOrDefault();

        if (race == null)
        {
            return null;
        }

        return new NextRaceDto
        {
            RaceName = race.RaceName,
            Circuit = race.Circuit.CircuitName,
            Country = race.Circuit.Location.Country,
            CircuitId = race.Circuit.CircuitId,
            Date = race.Date,
            Time = race.Time ?? "00:00:00Z",
            Round = int.Parse(race.Round),

            FirstPractice = race.FirstPractice == null ? null : new RaceSessionDto
            {
                Date = race.FirstPractice.Date,
                Time = race.FirstPractice.Time
            },
            SecondPractice = race.SecondPractice == null ? null : new RaceSessionDto
            {
                Date = race.SecondPractice.Date,
                Time = race.SecondPractice.Time
            },

            ThirdPractice = race.ThirdPractice == null ? null : new RaceSessionDto
            {
                Date = race.ThirdPractice.Date,
                Time = race.ThirdPractice.Time
            },

            Qualifying = race.Qualifying == null ? null : new RaceSessionDto
            {
                Date = race.Qualifying.Date,
                Time = race.Qualifying.Time
            },

            Sprint = race.Sprint == null ? null : new RaceSessionDto
            {
                Date = race.Sprint.Date,
                Time = race.Sprint.Time
            },
            SprintQualifying = race.SprintQualifying == null ? null : new RaceSessionDto
            {
                Date = race.SprintQualifying.Date,
                Time = race.SprintQualifying.Time
            }

        };
    }
}