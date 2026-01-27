import "./Races.css";

const events = [
  {
    id: 1,
    title: "MotoGP – Assen TT",
    category: "MotoGP",
    image: "/images/silverstone.JPG",
  },
  {
    id: 2,
    title: "WEC – 6 Hours of Monza",
    category: "WEC",
    image: "/images/silverstone.JPG",
  },
];

export default function UpcomingRaces() {
  return (
    <div className="upcoming-events">
      <h3 className="section-title">Upcoming Events</h3>

      <div className="events-row">
        {events.map((event) => (
          <div
            key={event.id}
            className="event-card"
            style={{ backgroundImage: `url(${event.image})` }}
          >
            <div className="event-overlay"></div>

            <div className="event-content">
              <p className="event-category">{event.category}</p>
              <h4 className="event-title">{event.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
