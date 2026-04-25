using Microsoft.AspNetCore.Mvc;
using F1Dashboard.Api.Services;

namespace F1Dashboard.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ICSController : ControllerBase
    {
        public class CalendarRequest
        {
            public List<string> SelectedEvents { get; set; }
            public int ReminderMinutes { get; set; }
        }

        private readonly NextRaceService _service;
        private readonly RaceCalendarService _calendarService;

        public ICSController(NextRaceService service, RaceCalendarService calendarService)
        {
            _service = service;
            _calendarService = calendarService;
        }

        [HttpPost("download-ics")]
        public async Task<IActionResult> DownloadCalendar([FromBody] CalendarRequest request)
        {
            var race = await _service.GetNextRaceAsync();

            var fileBytes = _calendarService.GenerateRaceCalendar(
                race,
                request.SelectedEvents,
                request.ReminderMinutes
            );
            return File(fileBytes, "text/calendar", "f1.ics");
        }
    }
}