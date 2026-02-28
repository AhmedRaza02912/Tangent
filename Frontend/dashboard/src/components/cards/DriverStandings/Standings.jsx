import { useEffect, useState } from "react";
import { driverImages } from "../../../utils/driverImages";
import "./DriverStandings.css";

export default function DriverStandings() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5019/api/f1/drivers/standings")
      .then(res => {
        // console.log('Response status:', res.status);
        // console.log('Response headers:', res.headers);
        if (!res.ok)
          {
            throw new Error("Failed to fetch standings");
          } 
        return res.json();
      })
      .then(data => {
        // console.log('Data received:', data);
        setDrivers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading the standings...</p>
  }
  if (error) {
    return <p>Error: {error}</p>
  }
  return (
    <div className="driver-standings-card">
      <h3>Driver Standings</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Wins</th>
              <th>Poles</th>
              <th>DNF</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (    
              <tr key={driver.imageKey || index}>
                <td className="driver-cell">
                  {driverImages[driver.imageKey] ? (
                    <img src={driverImages[driver.imageKey]} alt={driver.name} />
                  ) : (
                    <div className="driver-placeholder">{driver.name.charAt(0)}</div>
                  )}
                  <div>
                    <strong>{driver.name}</strong>
                  </div>
                </td>
                <td>{driver.wins}</td>
                <td>{driver.poles}</td>
                <td>{driver.dnfs}</td>
                <td className="points">{driver.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
