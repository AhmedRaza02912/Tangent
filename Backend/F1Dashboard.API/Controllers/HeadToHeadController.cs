using Microsoft.AspNetCore.Mvc;
using F1Dashboard.Api.Services;
using System.Runtime.CompilerServices;

namespace F1Dashboard.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HeadToHeadController : ControllerBase
    {
        private readonly HeadToHeadService _headToHeadService;

        public HeadToHeadController(HeadToHeadService headToHeadService)
        {
            _headToHeadService = headToHeadService;
        }

        [HttpGet]
        public async Task<ActionResult<HeadToHeadDto>> Get(
            [FromQuery(Name = "driver1")] string driver1,

            [FromQuery(Name = "driver2")] string driver2)
        {
           if(string.IsNullOrWhiteSpace(driver1) ||
           string.IsNullOrWhiteSpace(driver2))
            {
                return BadRequest("Both drivers required");
            } 

            var result = await _headToHeadService.Compare(driver1, driver2);
            return Ok(result);
        }
        
    }
}