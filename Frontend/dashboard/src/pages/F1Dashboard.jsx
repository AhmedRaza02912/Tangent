import TopBar from "../components/TopBar/top.jsx";
import RaceCard from "../components/cards/NextRace/RaceCard.jsx";
import DriverStandings from "../components/cards/DriverStandings/Standings.jsx";
import ConstructorStandings from "../components/cards/ConstructorStandings/Standings.jsx";

import "./Dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard">
            <div className="dashboard-grid">
                <div className="next-race">
                    <RaceCard />
                </div>

                <div className="constructor-standings">
                    <ConstructorStandings />
                </div>

                <div className="driver-standings">
                    <DriverStandings />
                </div>
            </div>
        </div>

    );
}
