import "./ConstructorStandings.css";

const mockTeams = [
  {
    position: 1,
    name: "Red Bull Racing",
    image: "./images/Teams/redbull.png",
    wins: 4,
    points: 200,
  },
  {
    position: 2,
    name: "Mercedes",
    image: "./images/Teams/mercedes.png",
    wins: 2,
    points: 187,
  },
  {
    position: 3,
    name: "Ferrari",
    image: "./images/Teams/ferrari.png",
    wins: 0,
    points: 177,
  },
  {
    position: 4,
    name: "McLaren",
    image: "./images/Teams/mclaren.png",
    wins: 0,
    points: 144,
  },
    {
    position: 5,
    name: "Racing Point",
    image: "./images/Teams/racing point.png",
    wins: 4,
    points: 100,
  },
  {
    position: 6,
    name: "Alpha Tauri",
    image: "./images/Teams/alpha tauri.png",
    wins: 0,
    points: 88,
  },
  {
    position: 7,
    name: "Alfa Romeo",
    image: "./images/Teams/alfa.png",
    wins: 0,
    points: 50,
  },
  {
    position: 8,
    name: "McLaren",
    image: "./images/Teams/mclaren.png",
    wins: 0,
    points: 36,
  },
    {
    position: 9,
    name: "Williams",
    image: "./images/Teams/williams.png",
    wins: 0,
    points: 32,
  },
    {
    position: 10,
    name: "Renault",
    image: "./images/Teams/renault.png",
    wins: 0,
    points: 15,
  },
  
];

export default function ConstructorStandings() {
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
            {mockTeams.map((team) => (
              <tr key={team.position}>
                <td>{team.position}</td>

                <td>
                  <div className="constructor-cell">
                    {team.image && (
                      <img src={team.image} alt={team.name} />
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
