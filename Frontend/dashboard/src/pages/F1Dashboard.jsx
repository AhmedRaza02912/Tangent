
import TopBar from "../components/TopBar/top.jsx";
import RaceCard from "../components/cards/NextRace/RaceCard.jsx";
import DriverStandings from "../components/cards/DriverStandings/Standings.jsx";
import ConstructorStandings from "../components/cards/ConstructorStandings/Standings.jsx";
import "./Dashboard.css";

// Placeholder for Latest News and Upcoming Events
function LatestNews() {
    return (
        <div className="latest-news-placeholder">
            <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: 8 }}>Latest News</div>
            <div style={{ color: "#888" }}>(Coming soon)</div>
        </div>
    );
}

function UpcomingEvents() {
    return (
        <div className="upcoming-events-placeholder">
            <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: 8 }}>Upcoming Events</div>
            <div style={{ color: "#888" }}>(Coming soon)</div>
        </div>
    );
}

export default function Dashboard() {
    return (
        <div className="dashboard">
            <div className="dashboard-main-grid">
                {/* Top Row: Next Race + Countdown | Latest News */}
                <div className="dashboard-top-row">
                    <div className="dashboard-next-race">
                        <RaceCard />
                    </div>
                    <div className="dashboard-latest-news">
                        <LatestNews />
                    </div>
                </div>

                {/* Middle Row: Standings */}
                <div className="dashboard-middle-row">
                    <div className="dashboard-driver-standings scrollable">
                        <DriverStandings />
                    </div>
                    <div className="dashboard-constructor-standings scrollable">
                        <ConstructorStandings />
                    </div>
                    <div className="dashboard-head-to-head">
                        {/* Head-to-Head or continued news can go here */}
                    </div>
                </div>

                {/* Bottom Row: Upcoming Events */}
                <div className="dashboard-bottom-row">
                    <UpcomingEvents />
                </div>
            </div>
        </div>
    );
}
