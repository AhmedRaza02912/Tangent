import { useState } from "react";
import "./CalendarModal.css";

export default function CalendarModal({ open, setOpen, race }) {
  const [selectedEvents, setSelectedEvents] = useState(["Race"]);
  const [reminder, setReminder] = useState(0);

  if (!open) return null;

  const toggleEvent = (event) => {
    setSelectedEvents((prev) =>
      prev.includes(event)
        ? prev.filter((e) => e !== event)
        : [...prev, event]
    );
  };

  const handleDownload = async () => {
    const response = await fetch("/api/ics/download-ics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        race,
        selectedEvents,
        reminderMinutes: reminder
      })
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${race.raceName}.ics`;
    a.click();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{race.raceName}</h2>

        {/* EVENTS */}
        <div className="events">
          {["FP1", "FP2", "FP3",  "Qualifying", "Sprint", "Race"].map((event) => (
            <label key={event}>
              <input
                type="checkbox"
                checked={selectedEvents.includes(event)}
                onChange={() => toggleEvent(event)}
              />
              {event.toUpperCase()}
            </label>
          ))}
        </div>

        {/* REMINDER */}
        <div className="reminder">
          <label>Reminder: </label>
          <select
            value={reminder}
            onChange={(e) => setReminder(Number(e.target.value))}
          >
            <option value={0}>No Reminder</option>
            <option value={10}>10 mins before</option>
            <option value={30}>30 mins before</option>
            <option value={60}>1 hour before</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="actions">
          <button onClick={() => setOpen(false)}>Cancel</button>

          <button
            className="download-btn"
            disabled={selectedEvents.length === 0}
            onClick={handleDownload}
          >
            Download .ics
          </button>
        </div>
      </div>
    </div>
  );
}