using Microsoft.AspNetCore.Mvc;
using F1Dashboard.Api.Services;

namespace F1Dashboard.API.Controllers;

[ApiController]
[Route("api/f1/upcoming")]
public class UpcomingRacesController : ControllerBase
{
    private readonly UpcomingRacesService _service;

    public UpcomingRacesController(UpcomingRacesService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var races = await _service.GetUpcomingThisMonthAsync();
        return Ok(races);
    }
}