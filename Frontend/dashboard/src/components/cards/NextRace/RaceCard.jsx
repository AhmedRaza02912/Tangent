import CountdownCard from "../Countdown/CountdownCard";
import "./RaceCard.css"; 

export default function RaceCard() {
  return (
    <div className="card">
      {/* Background Image Overlay */}
      <div className="overlay"></div>

      {/* Top Section: Title and Red Badge */}
      <div className="topSection">
        <div className="text">
          <h3 className="subHeader">Next Race:</h3>
          <h2 className="header">British Grand Prix</h2>
        </div>
        {/* Red Badge at Top Right */}
        <div className="redBadge">Sync with Calendar</div>
      </div>

      {/* Bottom Section: The Countdown Component */}
      <div className="countdownWrapper">
        <CountdownCard />
      </div>
    </div>
  );
}

