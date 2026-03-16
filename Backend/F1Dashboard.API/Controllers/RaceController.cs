using Microsoft.AspNetCore.Mvc;
using F1Dashboard.Api.Services;

namespace F1Dashboard.API.Controllers
{
    [ApiController]
    [Route("api/f1/races")]
    public class RaceController : ControllerBase
    {
        private readonly RaceResultService _raceService;

        public RaceController(RaceResultService raceService)
        {
            _raceService = raceService;
        }

        [HttpGet("last/results")]
        public async Task<IActionResult> GetLastRaceResults()
        {
            var results = await _raceService.GetLastRaceResultsAsync();

            return Ok(results);
        }
    }
}