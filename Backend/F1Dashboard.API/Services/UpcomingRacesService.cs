using System.Text.Json;
using F1Dashboard.Api.DTOs;
using F1Dashboard.Api.Infrastructure.Ergast;
using F1Dashboard.Api.Infrastructure.Ergast.Models;

namespace F1Dashboard.Api.Services;

public class UpcomingRacesService
{
    private readonly ErgastClient _ergast;

    public UpcomingRacesService(ErgastClient ergast)
    {
        _ergast = ergast;
    }

    public async Task<List<NextRaceDto>> GetUpcomingThisMonthAsync()
    {
        var json = await _ergast.GetSeasonScheduleAsync();
        var root = JsonSerializer.Deserialize<ErgastRoot>(json);
        var races = root?.MRData?.RaceTable?.Races;

        if (races == null)
        {
            return [];
        }

        var now = DateTime.UtcNow;
        var nextRaces = races.Where(r => DateTime.TryParse(r.Date, out var d) && d >= now)
        .OrderBy( r => DateTime.Parse(r.Date))
        .FirstOrDefault();

        return races
        .Where(
            r =>
            {
                if(!DateTime.TryParse(r.Date, out var date))
                return false;
                if(nextRaces != null && r.Round == nextRaces.Round)
                return false;
                return date > now && 
                date <= now.AddDays(50);
            }
        )
        .Select(r => new NextRaceDto
        {
            RaceName = r.RaceName,
            Circuit = r.Circuit.CircuitName,
            Country = r.Circuit.Location.Country,
            CircuitId = r.Circuit.CircuitId,
            Date = r.Date,
            Time = r.Time ?? "00:00:00Z",
            Round = int.Parse(r.Round)
        })
        .ToList();
    }
}