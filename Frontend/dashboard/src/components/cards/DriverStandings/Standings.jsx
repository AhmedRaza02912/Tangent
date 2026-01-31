import "./DriverStandings.css";

const mockDrivers = [
  {
    position: 1,
    name: "Fernando Alonso",
    image: "/images/Drivers/alonso.PNG",
    wins: 5,
    poles: 2,
    dnfs: 0,
    points: 100,
  },
  {
    position: 2,
    name: "Lewis Hamilton",
    image: "/images/Drivers/hamilton.PNG",
    wins: 3,
    poles: 2,
    dnfs: 1,
    points: 91,
  },
    {
    position: 3,
    name: "Max Verstappen",
    image: "/images/Drivers/max.PNG",
    wins: 1,
    poles: 0,
    dnfs: 0,
    points: 89,
  },
  {
    position: 4,
    name: "Charles Leclerc",
    image: "/images/Drivers/leclerc.PNG",
    wins: 1,
    poles: 0,
    dnfs: 0,
    points: 82,
  },
    {
    position: 5,
    name: "Oscar Piastri",
    image: "/images/Drivers/piastri.PNG",
    wins: 0,
    poles: 0,
    dnfs: 3,
    points: 77,
  },
  {
    position: 6,
    name: "George Russell",
    image: "/images/Drivers/russell.PNG",
    wins: 0,
    poles: 0,
    dnfs: 0,
    points: 60,
  },
  {
    position: 7,
    name: "Kimi Antonelli",
    image: "/images/Drivers/antonelli.PNG",
    wins: 0,
    poles: 0,
    dnfs: 0,
    points: 44
  },
    {
    position: 8,
    name: "Isack Hadjar",
    image: "/images/Drivers/hadjar.PNG",
    wins: 0,
    poles: 0,
    dnfs: 0,
    points: 40
  },
    {
    position: 9,
    name: "Lance Stroll",
    image: "/images/Drivers/stroll.PNG",
    wins: 0,
    poles: 0,
    dnfs: 0,
    points: 36
  },
    {
    position: 10,
    name: "Lando Norris",
    image: "/images/Drivers/norris.PNG",
    wins: 0,
    poles: 0,
    dnfs: 0,
    points: 35
  },
    {
    position: 11,
    name: "Liam Lawson",
    image: "/images/Drivers/lawson.PNG",
    wins: 0,
    poles: 0,
    dnfs: 0,
    points: 33
  },
    {
    position: 12,
    name: "Yuki Tsunoda",
    image: "/images/Drivers/tsunoda.PNG",
    wins: 0,
    poles: 0,
    dnfs: 0,
    points: 15
  },
      {
    position: 13,
    name: "Pierre Gasly",
    image: "/images/Drivers/gasly.PNG",
    wins: 0,
    poles: 0,
    dnfs: 0,
    points: 10
  },
      {
    position: 14,
    name: "Esteban Ocon",
    image: "/images/Drivers/ocon.PNG",
    wins: 0,
    poles: 0,
    dnfs: 0,
    points: 10
  },
      {
    position: 15,
    name: "Ollie Bearman",
    image: "/images/Drivers/bearman.PNG",
    wins: 0,
    poles: 0,
    dnfs: 0,
    points: 4
  },
      {
    position: 16,
    name: "Alex Albon",
    image: "/images/Drivers/albon.PNG",
    wins: 0,
    poles: 0,
    dnfs: 0,
    points: 0
  }
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
