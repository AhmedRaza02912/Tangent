import { useState } from "react";
import "./HeadToHead.css";
import { driverImages } from "../../../utils/driverImages";

const driverOptions = [
  { value: "max_verstappen", label: "Max Verstappen" },
  { value: "leclerc", label: "Charles Leclerc" },
  { value: "hamilton", label: "Lewis Hamilton" },
  { value: "norris", label: "Lando Norris" },
  { value: "piastri", label: "Oscar Piastri" },
  { value: "russell", label: "George Russell" },
  { value: "sainz", label: "Carlos Sainz" },
  { value: "alonso", label: "Fernando Alonso" },
  { value: "stroll", label: "Lance Stroll" },
  { value: "albon", label: "Alex Albon" },
  { value: "ocon", label: "Esteban Ocon" },
  { value: "gasly", label: "Pierre Gasly" },
  { value: "bottas", label: "Valtteri Bottas" },
  { value: "hulkenberg", label: "Nico Hulkenberg" },
  { value: "lawson", label: "Liam Lawson" },
  { value: "hadjar", label: "Isack Hadjar" },
  { value: "bearman", label: "Oliver Bearman" },
  { value: "antonelli", label: "Kimi Antonelli" },
  { value: "bortoleto", label: "Gabriel Bortoleto" },
  { value: "colapinto", label: "Franco Colapinto" },
  { value: "perez", label: "Sergio Perez" },
  { value: "arvid_lindblad", label: "Arvid Lindblad" }
];

export default function HeadToHead() {
  const [leftDriver, setLeftDriver] = useState("max_verstappen");
  const [rightDriver, setRightDriver] = useState("leclerc");

  const handleLeftDriverChange = (event) => {
    const nextLeftDriver = event.target.value;

    if (nextLeftDriver === rightDriver) {
      setRightDriver(leftDriver);
    }

    setLeftDriver(nextLeftDriver);
  };

  const handleRightDriverChange = (event) => {
    const nextRightDriver = event.target.value;

    if (nextRightDriver === leftDriver) {
      setLeftDriver(rightDriver);
    }

    setRightDriver(nextRightDriver);
  };

  const leftDriverName = driverOptions.find((driver) => driver.value === leftDriver)?.label ?? "Driver";
  const rightDriverName = driverOptions.find((driver) => driver.value === rightDriver)?.label ?? "Driver";

  return (
    <>
      <div className="h2h-title">
        <h3>Head to Head</h3>
      </div>

      <div className="h2h-driver-select-row">
        <div className="h2h-select-wrap h2h-select-left">
          <select
            className="h2h-driver-select"
            value={leftDriver}
            onChange={handleLeftDriverChange}
            aria-label="Select left driver"
          >
            {driverOptions.map((driver) => (
              <option
                key={driver.value}
                value={driver.value}
                disabled={driver.value === rightDriver}
              >
                {driver.label}
              </option>
            ))}
          </select>
        </div>
        <div className="h2h-select-spacer" aria-hidden="true"></div>
        <div className="h2h-select-wrap h2h-select-right">
          <select
            className="h2h-driver-select"
            value={rightDriver}
            onChange={handleRightDriverChange}
            aria-label="Select right driver"
          >
            {driverOptions.map((driver) => (
              <option
                key={driver.value}
                value={driver.value}
                disabled={driver.value === leftDriver}
              >
                {driver.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h2h-card">
        <div className="img-left">
          <div className="h2h-image-frame">
            <img
              className="h2h-driver-image"
              src={driverImages[leftDriver]}
              alt={leftDriverName}
            ></img>
          </div>
        </div>
        <div className="h2h-stats">
          <p className="stats-title">
            Race Finish
          </p>
          <p className="stats-title">
            Sprint Wins
          </p>
          <p className="stats-title">
            Sprint Poles
          </p>
          <p className="stats-title">
            Qualifying
          </p>
        </div>
        <div className="img-right">
          <div className="h2h-image-frame">
            <img
              className="h2h-driver-image"
              src={driverImages[rightDriver]}
              alt={rightDriverName}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}
