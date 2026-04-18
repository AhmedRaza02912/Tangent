using F1Dashboard.Api.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/test")]
public class TestController : ControllerBase{
    private readonly SprintStatsService _sprint;

    public TestController(SprintStatsService sprint)
    {
        _sprint = sprint;
    }

    [HttpGet("sprint")]
    public async Task<IActionResult> TestSprint()
    {
        var (winsA, winsB, podiumsA, podiumsB) = await _sprint.GetStringComparison(
            "russell",
            "hamilton"
        );
        return Ok(new {
        russell = new { wins = winsA, podiums = podiumsA },
        hamilton = new { wins = winsB, podiums = podiumsB }
    });
    }
    
}