import { useEffect, useState } from "react";
import { driverImages } from "../../../utils/driverImages";
import "./HeadToHead.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function HeadToHead() {
  const [driverA, setDriverA] = useState("DriverA");
  const [driverB, setDriverB] = useState("DriverB");
  const [stats, setStats] = useState(null);
  const [positions, setPositions] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!driverA || !driverB) {
      setState(null);
      return;
    }
      
    setLoading(true);
    fetch(`${API_BASE_URL}/api/headtohead?driver1=${driverA}&driver2=${driverB}`)
      .then((res) => res.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [driverA, driverB]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/f1/drivers/standings`)
      .then((res) => res.json())
      .then((data) => {
        const nextPositions = {};

        data.forEach((driver) => {
          nextPositions[driver.imageKey] = driver.position;
        });

        setPositions(nextPositions);
      })
      .catch(() => {
        setPositions({});
      });
  }, []);

  return (
    <div className="driver-standings-card">
      <h3>Head to Head</h3>

      {/* Main layout: image | stats | image */}
      <div className="h2h-main">
        <div className="h2h-side h2h-side--left">
          <select value={driverA} onChange={(e) => setDriverA(e.target.value)}>
            {!driverA && <option value="" disabled>Driver A</option>}
            {Object.keys(driverImages)
              .filter((d) => d !== driverB)
              .map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
          </select>
          <DriverAvatar driver={driverA} side="left" position={positions[driverA]} />
        </div>

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

        <div className="h2h-side h2h-side--right">
          <select value={driverB} onChange={(e) => setDriverB(e.target.value)}>
            {!driverB && <option value="" disabled>Driver B</option>}
            {Object.keys(driverImages)
              .filter((d) => d !== driverA)
              .map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
          </select>
          <DriverAvatar driver={driverB} side="right" position={positions[driverB]} />
        </div>
      </div>
    </div>
  );
}

function DriverAvatar({ driver, side, position }) {
  return (
    <div className={`h2h-driver h2h-driver--${side}`}>
      {driverImages[driver] ? (
        <>
          <img className="h2h-driver-image" src={driverImages[driver]} alt={driver} />
          {position != null && (
            <div className="h2h-driver-position">P{position} in championship</div>
          )}
        </>
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