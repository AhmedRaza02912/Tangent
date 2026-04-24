using System.Text;
using F1Dashboard.Api.DTOs;
using Ical.Net;
using Ical.Net.CalendarComponents;
using Ical.Net.DataTypes;
using Ical.Net.Serialization;

namespace F1Dashboard.Api.Services;

public class RaceCalendarService
{
    public byte[] GenerateRaceCalendar(NextRaceDto race, List<string> selectedEvents, int reminderMinutes)
    {

        var calendar = new Calendar{
            Method = "PUBLISH"
        };
        calendar.AddProperty("CALSCALE", "GREGORIAN");
        void AddEvent(string name, DateTime dateTime)
        {
            var utcDateTime = dateTime.Kind == DateTimeKind.Utc
                ? dateTime
                : dateTime.ToUniversalTime();

            var e = new CalendarEvent
            {
                Summary = $"{race.RaceName} - {name}",
                Start = new CalDateTime(utcDateTime),
                End = new CalDateTime(utcDateTime.AddHours(2)),
                Description = $"{race.RaceName} - {race.Circuit}",
                Location = race.Country,

                Uid = Guid.NewGuid().ToString(),
                DtStamp = new CalDateTime(DateTime.UtcNow),

                Status = EventStatus.Confirmed,
                Transparency = TransparencyType.Opaque
            };
            
            e.AddProperty("CLASS", "PUBLIC");
            // e.AddProperty("ORGANIZER", "mailto:no-reply@f1calendar.com");

            if (reminderMinutes > 0)
            {
                e.Alarms.Add(new Alarm
                {
                    Action = AlarmAction.Display,
                    Trigger = new Trigger(new Duration(minutes: -(int)reminderMinutes)),
                    Description = $"{name} starting soon"
                });
            }

            calendar.Events.Add(e);
        }
        DateTime raceTime = DateTime.SpecifyKind(
            DateTime.Parse($"{race.Date}T{race.Time}"),
            DateTimeKind.Utc
        );
        if (selectedEvents.Contains("Race"))
        {
            AddEvent(race.RaceName, raceTime);
        }

        if (selectedEvents.Contains("Qualifying") && race.Qualifying != null)
        {
            AddEvent("Qualifying", DateTime.SpecifyKind(
             DateTime.Parse($"{race.Qualifying.Date}T{race.Qualifying.Time}"), DateTimeKind.Utc));
        }
        if (selectedEvents.Contains("Sprint") && race.Sprint != null)
        {
            AddEvent("Sprint", DateTime.SpecifyKind(
    DateTime.Parse($"{race.Sprint.Date}T{race.Sprint.Time}"),
    DateTimeKind.Utc
));
        }
        if (selectedEvents.Contains("SprintQualifying") && race.SprintQualifying != null)
        {
            AddEvent("Sprint Qualifying", DateTime.SpecifyKind(
            DateTime.Parse($"{race.SprintQualifying.Date}T{race.SprintQualifying.Time}"),
            DateTimeKind.Utc
    ));
        }
        if (selectedEvents.Contains("FP1") && race.FirstPractice != null)
        {
            AddEvent("FP1", DateTime.SpecifyKind(
            DateTime.Parse($"{race.FirstPractice.Date}T{race.FirstPractice.Time}"),
            DateTimeKind.Utc
    ));
        }
        if (selectedEvents.Contains("FP2") && race.SecondPractice != null)
        {
            AddEvent("FP2", DateTime.SpecifyKind(
            DateTime.Parse($"{race.SecondPractice.Date}T{race.SecondPractice.Time}"),
            DateTimeKind.Utc
    ));
        }
        if (selectedEvents.Contains("FP3") && race.ThirdPractice != null)
        {
        AddEvent("FP3", DateTime.SpecifyKind(
        DateTime.Parse($"{race.ThirdPractice.Date}T{race.ThirdPractice.Time}"),
        DateTimeKind.Utc
));
        }

        var serializer = new CalendarSerializer();
        var serializedCalendar = serializer.SerializeToString(calendar);
        return Encoding.UTF8.GetBytes(serializedCalendar);
    }

}
