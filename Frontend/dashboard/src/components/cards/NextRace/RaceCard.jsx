import { useEffect, useState } from "react";
import CountdownCard from "../Countdown/CountdownCard";
import raceImages from "../../../utils/raceImages";
import "./RaceCard.css";

export default function RaceCard() {
  const [race, setRace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNextRace() {
      try {
        const res = await fetch("/api/f1/nextrace");
        if (!res.ok) throw new Error("Failed to fetch next race");
        const data = await res.json();
        setRace(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNextRace();
  }, []);

  const raceName = loading ? "Loading..." : error ? "Unavailable" : race?.raceName;
  const raceDate = race ? new Date(`${race.date}T${race.time}`) : null;
  const backgroundImage = race?.circuitId ? raceImages[race.circuitId] ?? null : null;

  return (
    <div
      className="card"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="overlay"></div>

      <div className="topSection">
        <div className="text">
          <h3 className="subHeader">Next Race</h3>
          <h2 className="header">{raceName}</h2>
          {race && (
            <p className="subText">{race.circuit} — {race.country}</p>
          )}
        </div>
        <div className="redBadge">Sync with Calendar</div>
      </div>

      <div className="countdownWrapper">
        <CountdownCard targetDate={raceDate} />
      </div>
    </div>
  );
}