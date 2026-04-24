import { useEffect, useState } from "react";
import raceImages from "../../../utils/raceImages";
import "./Upcoming.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function Upcoming() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/f1/upcoming`)
      .then((res) => res.json())
      .then((data) => {
        setRaces(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  };

  const formatTime = (timeStr) => {
    if (!timeStr || timeStr === "00:00:00Z") return "TBC";
    const [h, m] = timeStr.replace("Z", "").split(":");
    const date = new Date();
    date.setUTCHours(parseInt(h), parseInt(m));
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDaysUntil = (dateStr) => {
    const today = new Date();
    const race = new Date(dateStr);
    const diff = Math.ceil((race - today) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return `In ${diff} days`;
  };

  if (loading)
    return (
      <div className="upcoming-races-card">
        < h3 className="upcoming-races-title">Upcoming Races</h3>
        <p className="upcoming-status">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="upcoming-races-card">
        < h3 className="upcoming-races-title">Upcoming Races</h3>
        <p className="upcoming-status">Failed to load races.</p>
      </div>
    );
  if (races.length === 0)
    return (
      <div className="upcoming-races-card">
       < h3 className="upcoming-races-title">Upcoming Races</h3>
        <p className="upcoming-status">No upcoming races.</p>
      </div>
    );

  return (
    <div className="upcoming-races-card">
      <h3 className="upcoming-races-title">Upcoming Races</h3>
      <div className="upcoming-races-flex">
        {races.map((race) => {
          const img =
            raceImages[race.circuitId] ||
            raceImages[race.country?.toLowerCase()];
          return (
            <div key={race.round} className="race-card">
              <div className="race-card-image-wrap">
                {img ? (
                  <img
                    src={img}
                    alt={race.raceName}
                    className="race-card-image"
                  />
                ) : (
                  <div className="race-card-image-placeholder">🏁</div>
                )}

                {/* Overlay on TOP of image */}
                <div className="race-card-overlay">
                  <span className="race-card-round">RD {race.round}</span>
                </div>
                <div className="race-card-image-bottom">
                  <p className="race-card-name-overlay">{race.raceName}</p>
                  <span className="race-card-countdown-overlay">
                    {getDaysUntil(race.date)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
