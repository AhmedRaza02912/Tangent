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
            if (race == null)
            return BadRequest("race_null: GetNextRaceAsync returned null");

             if (string.IsNullOrEmpty(race.Date) || string.IsNullOrEmpty(race.Time))
            return BadRequest($"race_data_incomplete: Date={race.Date} Time={race.Time}");
            var fileBytes = _calendarService.GenerateRaceCalendar(
                race,
                request.SelectedEvents,
                request.ReminderMinutes
            );
            if (fileBytes.Length == 0)
            return BadRequest($"empty_ics: Race={race.RaceName}, FP1={race.FirstPractice?.Date}, Quali={race.Qualifying?.Date}, Selected={string.Join(",", request.SelectedEvents)}");
            return File(fileBytes, "text/calendar", "f1.ics");
        }
    }
}