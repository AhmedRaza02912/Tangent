using System.Text.Json;
using F1Dashboard.API.DTOs;
using F1Dashboard.Api.Infrastructure.Ergast.Models;
using F1Dashboard.Api.Infrastructure.Ergast;

namespace F1Dashboard.Api.Services;
public class DriverService
{
    private readonly ErgastClient _ergastClient;
    public DriverService(ErgastClient ergastClient)
    {
        _ergastClient = ergastClient;
    }
public async Task<List<DriverStandingDto>> GetDriverStandingsAsync(int year = 2024)
{
    var json = await _ergastClient.GetDriverStandingsRawAsync(year);
    Console.WriteLine($"=== RAW JSON (first 500 chars) ===");
    Console.WriteLine(json.Substring(0, Math.Min(500, json.Length)));
    
    if (json.Trim().StartsWith('<'))
    {
        throw new Exception("HTML instead of JSON");
    }
    
    var root = JsonSerializer.Deserialize<ErgastRoot>(json);
    Console.WriteLine($"Root null? {root == null}");
    Console.WriteLine($"MRData null? {root?.MRData == null}");
    Console.WriteLine($"StandingsTable null? {root?.MRData?.StandingsTable == null}");
    Console.WriteLine($"StandingsLists null? {root?.MRData?.StandingsTable?.StandingsLists == null}");
    Console.WriteLine($"StandingsLists Count: {root?.MRData?.StandingsTable?.StandingsLists?.Count ?? -1}");

    if (root?.MRData?.StandingsTable?.StandingsLists == null || 
        root.MRData.StandingsTable.StandingsLists.Count == 0)
    {
        Console.WriteLine("❌ RETURNING EMPTY: No StandingsLists");
        return new List<DriverStandingDto>();
    }

    var standings = root.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    Console.WriteLine($"DriverStandings null? {standings == null}");
    Console.WriteLine($"DriverStandings Count: {standings?.Count ?? -1}");
        
    if(standings == null || standings.Count == 0)
    {
        Console.WriteLine("❌ RETURNING EMPTY: No DriverStandings");
        return new List<DriverStandingDto>();
    }
    
    Console.WriteLine($"First driver: {standings[0].Driver?.GivenName} {standings[0].Driver?.FamilyName}");
    Console.WriteLine($"First driver points: '{standings[0].Points}'");
    Console.WriteLine($"First driver wins: '{standings[0].Wins}'");
    
    var result = standings
        .Where(s => !string.IsNullOrEmpty(s.Points))
        .OrderByDescending(s => int.TryParse(s.Points, out var p) ? p : 0)
        .Select(s => new DriverStandingDto
        {
            Name = $"{s.Driver.GivenName} {s.Driver.FamilyName}",
            Points = int.TryParse(s.Points, out var points) ? points : 0,
            Wins = int.TryParse(s.Wins, out var wins) ? wins : 0,
            Poles = 0,
            Dnfs = 0,
            ImageKey = s.Driver.DriverId
        })
        .ToList();
    
    Console.WriteLine($"✅ FINAL RESULT COUNT: {result.Count}");
    if (result.Count > 0)
    {
        Console.WriteLine($"First result: {result[0].Name}, {result[0].Points} points");
    }
    
    return result;
}}