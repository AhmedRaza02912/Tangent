import "./DriverStandings.css";

const mockDrivers = [
{
    position: 1,
    name: "Max Verstappen",
    team: "Red Bull Racing",
    points: 130
},
{
    position: 2,
    name: "Lewis Hamilton",
    team: "Mercedes",
    points: 120
},
{
    position: 3,
    name: "Charles Leclerc",
    team: "Ferrari",
    points: 110

},
{
    position: 4,
    name: "Lando Norris",
    team: "McLaren",
    points: 109
}
];

export default function DriverStandings(){
    return(
        <div className="driver-standings-card">
            <div className="header">
                <h3>Driver Standings</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Points</th>
                    </tr>
                </thead>
<tbody>
  {mockDrivers.map((driver) => (
    <tr key={driver.position}>
      <td>{driver.position}</td>
      <td>
        <div className="driver-name">
          <strong>{driver.name}</strong>
        </div>
      </td>
      <td>{driver.team}</td>
      <td>{driver.points}</td>
    </tr>
  ))}
</tbody>

            </table>
        </div>


    );
}