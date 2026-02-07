using Microsoft.AspNetCore.Mvc;
using F1Dashboard.Api.Services;

namespace F1Dashboard.API.Controllers
{
    [ApiController]
    [Route("api/f1/constructors")]
    public class ConstructorsController : ControllerBase
    {
        private readonly ConstructorService _constructorService;

        public ConstructorsController(ConstructorService constructorService)
        {
            _constructorService = constructorService;
        }

        [HttpGet("standings")]
        public async Task<IActionResult> GetStandings()
        {
            var result = await _constructorService.GetConstructorStandingsAsync();
            return Ok(result);
        }
    }
}
