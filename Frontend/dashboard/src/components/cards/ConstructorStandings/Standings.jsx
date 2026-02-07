import { useEffect, useState } from "react";
import constructorImages from "../../../utils/constructorImages"
import "./ConstructorStandings.css";

export default function ConstructorStandings() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5019/api/f1/constructors/standings") // adjust port if needed
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load constructor standings", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="constructor-standings-card">Loading the standings...</div>;
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
