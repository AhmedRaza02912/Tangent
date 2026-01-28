import TopBar from "../components/TopBar/top.jsx";
import RaceCard from "../components/cards/NextRace/RaceCard.jsx";
import DriverStandings from "../components/cards/DriverStandings/Standings.jsx";
import ConstructorStandings from "../components/cards/ConstructorStandings/Standings.jsx";
import UpcomingEvents from "../components/cards/UpcomingEvents/Upcoming.jsx";
import LatestNews from "../components/cards/LatestNewsCard/NewsCard.jsx";
import "./Dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard">
            <div className="dashboard-main-grid">
                <div className="dashboard-top-row">
                    <div className="dashboard-next-race">
                        <RaceCard />
                    </div>
                </div>
                <div className="dashboard-latest-news">
                    <LatestNews />
                </div>
                {/* Middle Row: Standings */}
                <div className="dashboard-middle-row">
                    <div className="dashboard-driver-standings scrollable">
                        <DriverStandings />
                    </div>
                    <div className="dashboard-constructor-standings scrollable">
                        <ConstructorStandings />
                    </div>
                </div>
                <div className="dashboard-bottom-row">
                    <UpcomingEvents />
                </div>
            </div>
        </div>
    );
}
