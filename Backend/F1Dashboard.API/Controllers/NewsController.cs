using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class NewsController : ControllerBase
{
    private readonly NewsService _newsService;
    public NewsController(NewsService newsService)
    {
        _newsService = newsService;
    }

    [HttpGet("f1")]
    public async Task<IActionResult> GetF1News()
    {
        try
        {
            var news = await _newsService.GetF1NewsAsync();
            return Content(news, "application/json");
        }
        catch (Exception ex)
        {
            return StatusCode(500, new{ error = ex.Message});
        }

    }

}