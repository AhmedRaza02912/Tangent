import { useEffect, useState } from "react";
import CountdownCard from "../Countdown/CountdownCard";
import raceImages from "../../../utils/raceImages";
import "./RaceCard.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function RaceCard() {
  const [race, setRace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNextRace() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/f1/nextrace`);
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

  const raceName = loading
    ? "Loading..."
    : error
      ? "Unavailable"
      : race?.raceName;
  const raceDate = race ? new Date(`${race.date}T${race.time}`) : null;
  const backgroundImage = race?.circuitId
    ? (raceImages[race.circuitId] ?? null)
    : null;
  const raceWeekend = race
    ? {
        raceName: race.raceName,
        circuit: race.circuit,
        sessions: [
          {
            id: "race",
            name: "Race",
            start: `${race.date}T${race.time}`,
            end: new Date(
              new Date(`${race.date}T${race.time}`).getTime() +
                2 * 60 * 60 * 1000,
            ).toISOString(), // +2 hours
          },
        ],
      }
    : null;
  return (
    <div
      className="card"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      <div className="overlay"></div>

      <div className="topSection">
        <div className="text">
          <h3 className="subHeader">Next Race</h3>
          <h2 className="header">{raceName}</h2>
          {race && (
            <p className="subText">
              {race.circuit} — {race.country}
            </p>
          )}
        </div>
      </div>

      <div className="countdownWrapper">
        <CountdownCard targetDate={raceDate} />
      </div>
    </div>
  );
}
