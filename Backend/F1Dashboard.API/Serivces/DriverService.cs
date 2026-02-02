using F1Dashboard.API.DTOs;

namespace F1Dashboard.Api.Services;

public class DriverService
{
    public List<DriverStandingDto> GetDriverStandings()
    {
        var drivers = new List<DriverStandingDto>
        {
            new DriverStandingDto
            {
                Position = 1,
                Name = "Max Verstappen",
                Wins = 0,
                Poles = 0,
                Dnfs = 1,
                Points = 30,
                ImageKey = "max"
            },
            new DriverStandingDto
            {
                Position = 2,
                Name = "Lewis Hamilton",
                Wins = 0,
                Poles = 0,
                Dnfs = 1,
                Points = 30,
                ImageKey = "hamilton"
            },
            new DriverStandingDto
            {
                Position = 3,
                Name = "Charles Leclerc",
                Wins = 0,
                Poles = 0,
                Dnfs = 0,
                Points = 12,
                ImageKey = "leclerc"
            },
            new DriverStandingDto
            {
                Position = 4,
                Name = "Fernando Alonso",
                Wins = 0,
                Poles = 0,
                Dnfs = 0,
                Points = 70,
                ImageKey = "alonso"
            },
            new DriverStandingDto
            {
                Position = 5,
                Name = "Andrea Kimi Antonelli",
                Wins = 0,
                Poles = 0,
                Dnfs = 0,
                Points = 0,
                ImageKey = "antonelli"
            },
            new DriverStandingDto
            {
                Position = 6,
                Name = "Oliver Bearman",
                Wins = 0,
                Poles = 0,
                Dnfs = 0,
                Points = 6,
                ImageKey = "bearman"
            },
            new DriverStandingDto
            {
                Position = 7,
                Name = "Pierre Gasly",
                Wins = 0,
                Poles = 0,
                Dnfs = 1,
                Points = 8,
                ImageKey = "gasly"
            },
            new DriverStandingDto
            {
                Position = 8,
                Name = "Isack Hadjar",
                Wins = 0,
                Poles = 0,
                Dnfs = 0,
                Points = 0,
                ImageKey = "hadjar"
            },
            new DriverStandingDto
            {
                Position = 9,
                Name = "Liam Lawson",
                Wins = 0,
                Poles = 0,
                Dnfs = 0,
                Points = 4,
                ImageKey = "lawson"
            },
            new DriverStandingDto
            {
                Position =10,
                Name = "Lando Norris",
                Wins = 4,
                Poles = 5,
                Dnfs = 0,
                Points = 374,
                ImageKey = "norris"
            },
            new DriverStandingDto
            {
                Position = 11,
                Name = "Esteban Ocon",
                Wins = 0,
                Poles = 0,
                Dnfs = 0,
                Points = 5,
                ImageKey = "ocon"
            },
            new DriverStandingDto
            {
                Position = 12,
                Name = "Oscar Piastri",
                Wins = 2,
                Poles = 0,
                Dnfs = 0,
                Points = 292,
                ImageKey = "piastri"
            },
            new DriverStandingDto
            {
                Position = 13,
                Name = "George Russell",
                Wins = 2,
                Poles = 3,
                Dnfs = 1,
                Points = 245,
                ImageKey = "russell"
            },
            new DriverStandingDto
            {
                Position = 14,
                Name = "Lance Stroll",
                Wins = 0,
                Poles = 0,
                Dnfs = 1,
                Points = 24,
                ImageKey = "stroll"
            },
            new DriverStandingDto
            {
                Position = 15,
                Name = "Yuki Tsunoda",
                Wins = 0,
                Poles = 0,
                Dnfs = 1,
                Points = 30,
                ImageKey = "tsunoda"
            },
            new DriverStandingDto
            {
                Position = 16,
                Name = "Alex Albon",
                Wins = 0,
                Poles = 0,
                Dnfs = 1,
                Points = 30,
                ImageKey = "albon"
            }
        };

        var sorted = drivers
            .OrderByDescending(driver => driver.Points)
            .ToList();

        for (var i = 0; i < sorted.Count; i++)
        {
            sorted[i].Position = i + 1;
        }

        return sorted;
    }
}