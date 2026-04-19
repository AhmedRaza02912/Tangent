import { useEffect, useState } from "react";
import { driverImages } from "../../../utils/driverImages";
import "./HeadToHead.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function HeadToHead() {
  const [driverA, setDriverA] = useState("hamilton");
  const [driverB, setDriverB] = useState("leclerc");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!driverA || !driverB) return;
    setLoading(true);
    fetch(`${API_BASE_URL}/api/headtohead?driver1=${driverA}&driver2=${driverB}`)
      .then((res) => res.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [driverA, driverB]);

  return (
    <div className="driver-standings-card">
      <h3>Head to Head</h3>

      {/* Selectors on opposite sides */}
      <div className="h2h-selectors">
        <select value={driverA} onChange={(e) => setDriverA(e.target.value)}>
    {Object.keys(driverImages)
      .filter((d) => d !== driverB)
      .map((d) => (
        <option key={d} value={d}>{d}</option>
      ))}
  </select>

  <select value={driverB} onChange={(e) => setDriverB(e.target.value)}>
    {Object.keys(driverImages)
      .filter((d) => d !== driverA)
      .map((d) => (
        <option key={d} value={d}>{d}</option>
      ))}
  </select>
</div>

      {/* Main layout: image | stats | image */}
      <div className="h2h-main">
        <DriverAvatar driver={driverA} side="left" />

        <div className="h2h-stats">
{stats && (
  <>
    <ComparisonRow label="Race Finish" left={stats.driverAAheadRace} right={stats.driverBAheadRace} total={24} />
    <ComparisonRow label="Qualifying" left={stats.driverAAheadQuali} right={stats.driverBAheadQuali} total={24} />
    <ComparisonRow label="Sprint Wins" left={stats.driverASprintWins} right={stats.driverBSprintWins} total={6} />
    <ComparisonRow label="Sprint Podiums" left={stats.driverASprintPodiums} right={stats.driverBSprintPodiums} total={6} />
  </>
)}
        </div>

        <DriverAvatar driver={driverB} side="right" />
      </div>
    </div>
  );
}

function DriverAvatar({ driver, side }) {
  return (
    <div className={`h2h-driver h2h-driver--${side}`}>
      {driverImages[driver] ? (
        <img src={driverImages[driver]} alt={driver} />
      ) : (
        <div className="driver-placeholder">{driver.charAt(0)}</div>
      )}
    </div>
  );
}

function ComparisonRow({ label, left, right, total }) {
  const leftPercent = Math.min((left / total) * 100, 100);
  const rightPercent = Math.min((right / total) * 100, 100);

  return (
    <div className="comparison-row">
      <div className="comparison-bar-wrapper">
        <span className="bar-value">{left}</span>

        <div className="comparison-bars">
          <div className="comparison-label">{label}</div>
          <div className="bar-row">
            {/* Left bar grows from center toward left driver */}
            <div className="bar-track bar-track--left">
              <div className="bar-fill--left" style={{ width: `${leftPercent}%` }} />
            </div>

            {/* Right bar grows from center toward right driver */}
            <div className="bar-track bar-track--right">
              <div className="bar-fill--right" style={{ width: `${rightPercent}%` }} />
            </div>
          </div>
        </div>

        <span className="bar-value">{right}</span>
      </div>
    </div>
  );
}