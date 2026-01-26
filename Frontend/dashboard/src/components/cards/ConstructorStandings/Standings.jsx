import "./ConstructorStandings.css";

const mockTeams = [
    {
        position: 1,
        name: "Redbull Racing",
        Wins: 4,
        points: 200
    },
    {
        position: 2,
        name: "Mercedes",
        Wins: 2,
        points: 187
    },
    {
        position: 3,
        name: "Ferrari",
        Wins: 0,
        points: 177
    },
    {
        position: 4,
        name: "McLaren",
        Wins: 0,
        points: 144
    }
];

export default function ConstructorStandings() {
    return (
        <div className="constructor-standings-card">
            <div className="header">
                <h3>Constructor Standings</h3>
            </div>
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
                                <div className="constructor-name">
                                    <strong>{team.name}</strong>
                                </div>
                            </td>
                            <td>{team.Wins}</td>
                            <td>{team.points}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>


    );
}
