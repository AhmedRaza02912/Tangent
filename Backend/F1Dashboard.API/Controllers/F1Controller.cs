using Microsoft.AspNetCore.Mvc;
using F1Dashboard.Api.Services;

namespace F1Dashboard.API.Controllers
{
    [ApiController]
    [Route("api/f1")]
    public class F1Controller : ControllerBase
    {
        private readonly DriverService _driverService;

        public F1Controller(DriverService driverService)
        {
            _driverService = driverService;
        }

        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok("F1 API is running 🚀");
        }

        [HttpGet("drivers/standings")]
        public IActionResult GetDriverStandings()
        {
            var drivers = _driverService.GetDriverStandings();
            return Ok(drivers);
        }

    }
}
