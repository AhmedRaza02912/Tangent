using System;
using Ical.Net;
using Ical.Net.DataTypes;
using Ical.Net.CalendarComponents;

public class Test {
    public void CreateAlarm() {
        var alarm = new Alarm {
            Action = AlarmAction.Display,
            Trigger = new Trigger(new Duration(TimeSpan.FromMinutes(-15))),
            Description = "Reminder"
        };
    }
}
