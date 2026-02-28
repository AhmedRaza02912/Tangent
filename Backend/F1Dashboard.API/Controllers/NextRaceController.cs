using Microsoft.AspNetCore.Mvc;
using F1Dashboard.Api.Services;

namespace F1Dashboard.API.Controllers;

    [ApiController]
    [Route("api/f1/nextrace")]
    public class NextRaceController : ControllerBase
{
    private readonly NextRaceService _nextRaceService;
        public NextRaceController(NextRaceService nextRaceService)
    {
        _nextRaceService = nextRaceService;
    }

    [HttpGet]
    public async Task<IActionResult> GetNextRace()
    {
        var result = await _nextRaceService.GetNextRaceAsync();
        return Ok(result);
    }

}
