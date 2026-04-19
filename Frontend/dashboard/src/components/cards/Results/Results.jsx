import { useEffect, useState } from "react";
import { driverImages } from "../../../utils/driverImages";
import "./Results.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const renderStatusCard = (message, isError = false) => (
    <div className="results-card">
      <h3>Race Results</h3>
      <div className="table-wrapper">
        <p className={`results-status${isError ? " error" : ""}`}>{message}</p>
      </div>
    </div>
  );

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/f1/races/last/results`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch race results");
        }
        return res.json();
      })
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return renderStatusCard("Loading race results...");
  }

  if (error) {
    return renderStatusCard("Race results unavailable right now.", true);
  }

  if (results.length === 0) {
    return renderStatusCard("No race results available.");
  }

  return (
    <div className="results-card">
      <h3 className="heading">Previous Race Results</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Driver</th>
              <th>Gap</th>
            </tr>
          </thead>

          <tbody>
            {results.map((driver, index) => (
              <tr key={driver.driverId || index}>
                <td className="position">{driver.position}</td>

                <td className="driver-cell">
                  {driverImages[driver.driverId] ? (
                    <img
                      src={driverImages[driver.driverId]}
                      alt={driver.name}
                    />
                  ) : (
                    <div className="driver-placeholder">
                      {driver.name.charAt(0)}
                    </div>
                  )}

                  <div>
                    <strong>{driver.name}</strong>
                  </div>
                </td>

                <td className="gap">{driver.gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
