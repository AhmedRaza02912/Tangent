using Microsoft.AspNetCore.Mvc;
using F1Dashboard.Api.Services;

namespace F1Dashboard.API.Controllers
{
    [ApiController]
    [Route("api/f1/drivers")]
    public class F1Controller : ControllerBase
    {
        private readonly DriverService _service;

        public F1Controller(DriverService service)
        {
            _service = service;
        }

        [HttpGet("standings")]
        public async Task<IActionResult> GetStandings()
        {
            var drivers = await _service.GetDriverStandingsAsync();
            return Ok(drivers);
        }

    }
}
