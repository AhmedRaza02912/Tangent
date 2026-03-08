import { useEffect, useState } from "react";
import constructorImages from "../../../utils/constructorImages"
import "./ConstructorStandings.css";

export default function ConstructorStandings() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const renderStatusCard = (message, isError = false) => (
    <div className="constructor-standings-card">
      <h3>Constructor Standings</h3>
      <div className="constructor-table-wrapper">
        <p className={`standings-status${isError ? " error" : ""}`}>{message}</p>
      </div>
    </div>
  );

  useEffect(() => {
    fetch("http://localhost:5019/api/f1/constructors/standings") // adjust port if needed
      .then((res) => {
        if(!res.ok){
          throw new Error("Failed to fetch standings");
        }
        return res.json();
      })
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load constructor standings", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return renderStatusCard("Loading standings...");
  }

  if (error) {
    return renderStatusCard("Standings unavailable right now.", true);
  }

  if (teams.length === 0) {
    return renderStatusCard("No standings data available.");
  }

  return (
    <div className="constructor-standings-card">
      <h3>Constructor Standings</h3>

      <div className="constructor-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Constructor</th>
              <th>Wins</th>
              <th>Points</th>
            </tr>
          </thead>

          <tbody>
            {teams.map((team) => (
              <tr key={team.position}>
                <td>{team.position}</td>
                <td>
                  <div className="constructor-cell">
                    {constructorImages[team.constructorId] && (
                      <img
                        src={constructorImages[team.constructorId]}
                        alt={team.name}
                      />
                    )}
                    <strong>{team.name}</strong>
                  </div>
                </td>
                <td>{team.wins}</td>
                <td className="constructor-points">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
