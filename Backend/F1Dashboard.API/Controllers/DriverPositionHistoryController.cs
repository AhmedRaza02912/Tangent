using Microsoft.AspNetCore.Mvc;
using F1Dashboard.Api.Services;

namespace F1Dashboard.API.Controllers;

[ApiController]
[Route("api/f1/drivers")]
public class DriverPositionHistoryController : ControllerBase
{
    private readonly DriverPositionHistoryService _service;

    public DriverPositionHistoryController(DriverPositionHistoryService service)
    {
        _service = service;
    }

    /// <summary>
    /// GET /api/f1/drivers/position-history?ids=hamilton&ids=max_verstappen&ids=norris
    /// Returns race-by-race finish positions for up to 5 drivers.
    /// </summary>
    [HttpGet("position-history")]
    public async Task<IActionResult> GetPositionHistory(
        [FromQuery(Name = "ids")] List<string> ids)
    {
        if (ids == null || ids.Count == 0)
            return BadRequest("At least one driver id is required.");

        if (ids.Count > 5)
            return BadRequest("A maximum of 5 drivers can be compared at once.");

        var result = await _service.GetPositionHistoryAsync(ids);
        return Ok(result);
    }
}
