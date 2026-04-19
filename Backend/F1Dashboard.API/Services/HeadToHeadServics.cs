using System.Text.Json;
using F1Dashboard.Api.Infrastructure.Ergast;
using F1Dashboard.Api.Infrastructure.Ergast.Models;
using F1Dashboard.Api.Services;

public class HeadToHeadService
{
    private readonly ErgastClient _ergast;
    private readonly SprintStatsService _sprint;

    public HeadToHeadService(ErgastClient ergast, SprintStatsService sprint)
    {
        _ergast = ergast;
        _sprint = sprint;
    }
    
    public async Task<HeadToHeadDto> Compare(string driverA, string driverB)
    {
        var race = await CompareRace(driverA, driverB);
        var quali = await CompareQualifying(driverA, driverB);
        var sprint = await _sprint.GetStringComparison(driverA, driverB);

        return new HeadToHeadDto
        {
            DriverAAheadRace = race.a,
            DriverBAheadRace = race.b,

            DriverAAheadQuali = quali.a,
            DriverBAheadQuali = quali.b,

            DriverASprintWins = sprint.winsA,
            DriverBSprintWins = sprint.winsB,

            DriverASprintPodiums = sprint.podiumsA,
            DriverBSprintPodiums = sprint.podiumsB

        };

    }

    private async Task<(int a, int b)> CompareRace(string driverA, string driverB)
    {
        var json = await _ergast.GetRaceResultsRawAsync();
        var root = JsonSerializer.Deserialize<ErgastRoot>(json);

        int aAhead = 0;
        int bAhead = 0;

        foreach(var race in root?.MRData?.RaceTable?.Races ?? [])
        {
            var results = race.Results;
            if (results == null) continue;

            var a = results.FirstOrDefault(x => x.Driver.DriverId == driverA);
            var b = results.FirstOrDefault(x => x.Driver.DriverId == driverB);

            if(a != null && b != null &&
            int.TryParse(a.Position, out int posA) &&
            int.TryParse(b.Position, out int posB))
            {
                if(posA < posB) aAhead++;
                else if(posB < posA) bAhead++;
            }
        }
        return(aAhead, bAhead);
    }

    private async Task<(int a, int b)> CompareQualifying(string driverA, string driverB)
    {
        var json = await _ergast.GetQualifyingResultsRawAsync();
        var root = JsonSerializer.Deserialize<ErgastRoot>(json);

        int aAhead = 0;
        int bAhead = 0;

        foreach(var race in root?.MRData?.RaceTable?.Races ?? [])
        {
            var results = race.QualifyingResults;
            if (results == null) continue;

            var a = results.FirstOrDefault(x => x.Driver.DriverId == driverA);
            var b = results.FirstOrDefault(x => x.Driver.DriverId == driverB);

            if( a != null && b != null &&
            int.TryParse(a.Position, out int posA) &&
            int.TryParse(b.Position, out int posB))
            {
                if(posA < posB) aAhead++;
                else if(posB < posA) bAhead++;
            }
        }

        return(aAhead, bAhead);
    }
    
}