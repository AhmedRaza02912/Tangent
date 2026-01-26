import RaceCard from "../components/cards/NextRace/RaceCard.jsx";
import CountdownCard from "../components/cards/Countdown/CountdownCard.jsx";
import DriverStandings from "../components/cards/DriverStandings/Standings.jsx";
import ConstructorStandings from "../components/cards/ConstructorStandings/Standings.jsx";

export default function F1Dashboard() {
  return (
    <>
      <h1>Dashboard Content</h1>
      <RaceCard
        raceName="British Grand Prix"
        location="Silverstone, UK"
        date="12 Feb 2026"
      />
      <CountdownCard />
      <ConstructorStandings />
      <DriverStandings />
    </>
  );
}
