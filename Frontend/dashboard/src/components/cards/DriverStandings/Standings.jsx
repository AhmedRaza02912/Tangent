import "./DriverStandings.css";

const mockDrivers = [
  {
    position: 1,
    name: "Fernando Alonso",
    image: "/images/fernando.webp",
    wins: 38,
    poles: 22,
    dnfs: 0,
    points: 100,
  },
  {
    position: 2,
    name: "Lewis Hamilton",
    image: "/images/lewis.webp",
    wins: 20,
    poles: 18,
    dnfs: 5,
    points: 91,
  },
    {
    position: 3,
    name: "Max Verstappen",
    image: "/images/max.webp",
    wins: 38,
    poles: 30,
    dnfs: 0,
    points: 100,
  },
  {
    position: 4,
    name: "Charles Leclerc",
    image: "/images/charles.webp",
    wins: 20,
    poles: 12,
    dnfs: 5,
    points: 91,
  },
    {
    position: 5,
    name: "Oscar Piastri",
    image: "/images/oscar.webp",
    wins: 38,
    poles: 5,
    dnfs: 0,
    points: 100,
  },
  {
    position: 6,
    name: "George Russell",
    image: "/images/george.webp",
    wins: 20,
    poles: 7,
    dnfs: 5,
    points: 91,
  },
];

export default function DriverStandings() {
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
            {mockDrivers.map((driver) => (
              <tr key={driver.position}>
                <td className="driver-cell">
                  <img src={driver.image} alt={driver.name} />
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
