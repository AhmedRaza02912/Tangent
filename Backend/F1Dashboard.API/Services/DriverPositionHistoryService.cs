using F1Dashboard.API.DTOs;
using F1Dashboard.Api.Infrastructure.Ergast;
using F1Dashboard.Api.Infrastructure.Ergast.Models;

namespace F1Dashboard.Api.Services;

public class DriverPositionHistoryService
{
    private readonly ErgastClient _ergast;

    public DriverPositionHistoryService(ErgastClient ergast)
    {
        _ergast = ergast;
    }

    /// <summary>
    /// Returns the race-by-race finish position history for one or more drivers.
    /// Only races that have already been run (i.e. that have a Results list) are included.
    /// </summary>
    public async Task<List<DriverPositionHistoryDto>> GetPositionHistoryAsync(
        IEnumerable<string> driverIds)
    {
        // GetAllRacesPaginatedAsync pages through the Jolpica API 100 rows at
        // a time to work around the server-side row cap (~200 rows = ~10 races).
        var races = await _ergast.GetAllRacesPaginatedAsync();

        if (races == null) return [];

        // Build per-driver history in a single pass through all races
        var histories = driverIds
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToDictionary(
                id => id,
                _ => new DriverPositionHistoryDto(),
                StringComparer.OrdinalIgnoreCase);

        foreach (var race in races.OrderBy(r => int.Parse(r.Round)))
        {
            if (race.Results == null || race.Results.Count == 0)
                continue; // race hasn't happened yet

            foreach (var (driverId, history) in histories)
            {
                var result = race.Results.FirstOrDefault(
                    r => string.Equals(r.Driver.DriverId, driverId, StringComparison.OrdinalIgnoreCase));

                if (result == null) continue; // driver didn't participate

                // Populate driver metadata from the first encountered result
                if (string.IsNullOrEmpty(history.DriverId))
                {
                    history.DriverId   = result.Driver.DriverId;
                    history.DriverName = $"{result.Driver.GivenName} {result.Driver.FamilyName}";
                    history.Constructor   = result.Constructor?.Name ?? "Unknown";
                    history.ConstructorId = result.Constructor?.ConstructorId ?? string.Empty;
                }

                bool dnf = result.PositionText == "R";
                int? pos  = int.TryParse(result.Position, out var p) ? p : null;

                history.Races.Add(new RacePositionDto
                {
                    Round       = int.Parse(race.Round),
                    RaceName    = race.RaceName,
                    CircuitName = race.Circuit.CircuitName,
                    Country     = race.Circuit.Location.Country,
                    Position    = dnf ? null : pos,
                    Dnf         = dnf,
                });
            }
        }

        return [.. histories.Values.Where(h => !string.IsNullOrEmpty(h.DriverId))];
    }
}
