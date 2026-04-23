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
        var calendar = new Calendar();

        void AddEvent(string name, DateTime dateTime)
        {
            var e = new CalendarEvent
            {
                Summary = $"{race.RaceName} - {name}",
                Start = new CalDateTime(dateTime.ToUniversalTime()),
                End = new CalDateTime(dateTime.AddHours(2).ToUniversalTime()),
                Description = $"{race.RaceName} - {race.Circuit}",
                Location = race.Country

            };
            e.Alarms.Add(new Alarm
            {
                Action = AlarmAction.Display,
                Trigger = new Trigger(new Duration(minutes: -(int)reminderMinutes)),
                Description = $"{name} starting soon" 
            });
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
            AddEvent("Sprint", DateTime.Parse($"{race.Sprint.Date}T{race.Sprint.Time}"));
        }
        if (selectedEvents.Contains("SprintQualifying") && race.SprintQualifying != null)
        {
            AddEvent("Sprint Qualifying", DateTime.Parse($"{race.SprintQualifying.Date}T{race.SprintQualifying.Time}"));
        }
        if (selectedEvents.Contains("FP1") && race.FirstPractice != null)
        {
            AddEvent("FP1", DateTime.Parse($"{race.FirstPractice.Date}T{race.FirstPractice.Time}"));
        }
        if (selectedEvents.Contains("FP2") && race.SecondPractice != null)
        {
            AddEvent("FP2", DateTime.Parse($"{race.SecondPractice.Date}T{race.SecondPractice.Time}"));
        }
        if (selectedEvents.Contains("FP3") && race.ThirdPractice != null)
        {
            AddEvent("FP3", DateTime.Parse($"{race.ThirdPractice.Date}T{race.ThirdPractice.Time}"));
        }

        var serializer = new CalendarSerializer();
        var serializedCalendar = serializer.SerializeToString(calendar);

        return Encoding.UTF8.GetBytes(serializedCalendar);
    }

}
