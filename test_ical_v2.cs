using System;
using Ical.Net;
using Ical.Net.DataTypes;
using Ical.Net.CalendarComponents;

public class TestV2 {
    public void CreateAlarm() {
        var duration = new Duration(TimeSpan.FromMinutes(-15));
        var trigger = new Trigger(duration);
        var alarm = new Alarm {
            Action = AlarmAction.Display,
            Trigger = trigger,
            Description = "Reminder"
        };
    }
}
