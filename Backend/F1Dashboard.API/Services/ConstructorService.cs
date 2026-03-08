using System.Text.Json;
using F1Dashboard.API.DTOs;
using F1Dashboard.Api.Infrastructure.Ergast;
using F1Dashboard.Api.Infrastructure.Ergast.Models;
using F1Dashboard.Api.DTOs;

namespace F1Dashboard.Api.Services;

public class ConstructorService
{
    private readonly ErgastClient _ergastClient;

    public ConstructorService(ErgastClient ergastClient)
    {
        _ergastClient = ergastClient;
    }

    public async Task<List<ConstructorStandingDto>> GetConstructorStandingsAsync()
    {
        var json = await _ergastClient.GetConstructorStandingRawAsync();
        var root = JsonSerializer.Deserialize<ErgastRoot>(json);

        var standings = root?.MRData?.StandingsTable?.StandingsLists?.FirstOrDefault()?.ConstructorStandings;

        if(standings == null || standings.Count == 0)
        {
            return new();
        }

        return standings
        .OrderBy(s => int.TryParse(s.Position, out var pos) ? pos : int.MaxValue)
        .Select(s => new ConstructorStandingDto
        {
            Position = s.Position,
            Name = s.Constructor.Name,
            Points = int.Parse(s.Points!),
            Wins = int.Parse(s.Wins!),
            constructorId = s.Constructor.ConstructorId
        })
        .ToList();
    }
}