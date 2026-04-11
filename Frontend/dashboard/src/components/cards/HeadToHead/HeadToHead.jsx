import { useState } from "react";
import "./HeadToHead.css";
import { driverImages } from "../../../utils/driverImages"; 

const drivers = [
  {
    id: 1,
    name: "Max Verstappen",
    imageKey: "verstappen",
    stats: {
      stats: 130,
      poles: 74,
      wins: 54,
      rankings: 1,
    },
  },
  {
    id: 2,
    name: "Lewis Hamilton",
    imageKey: "hamilton",
    stats: {
      stats: 153,
      poles: 53,
      wins: 68,
      rankings: 2,
    },
  },
];

export default function HeadToHead() {
  const [leftDriver, setLeftDriver] = useState(drivers[0]);
  const [rightDriver, setRightDriver] = useState(drivers[1]);

  const statKeys = ["stats", "poles", "wins", "rankings"];

  return (
    <div className="h2h-card">
      <h2 className="h2h-title">Head-to-Head</h2>
      {/* Drivers */}
      <div className="h2h-drivers">
        <div className="h2h-driver left">
          <img src={driverImages[leftDriver.imageKey]} alt={leftDriver.name} />
          <span>{leftDriver.name}</span>
        </div>

        <div className="h2h-vs">VS</div>

        <div className="h2h-driver right">
          <span>{rightDriver.name}</span>
          <img src={driverImages[rightDriver.imageKey]} alt={rightDriver.name} />
        </div>
      </div>

      {/* Stats */}
      <div className="h2h-stats">
        {statKeys.map((key) => {
          const leftVal = leftDriver.stats[key];
          const rightVal = rightDriver.stats[key];
          const max = Math.max(leftVal, rightVal);

          const leftPercent = (leftVal / max) * 50;
          const rightPercent = (rightVal / max) * 50;

          return (
            <div key={key} className="h2h-stat-row">
              
              <span className="value left">{leftVal}</span>

              <div className="bar-area">
                <div
                  className="bar left"
                  style={{ width: `${leftPercent}%` }}
                />
                <div
                  className="bar right"
                  style={{ width: `${rightPercent}%` }}
                />
                <div className="center-line"></div>
              </div>

              <span className="value right">{rightVal}</span>

              <div className="label">{key}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}