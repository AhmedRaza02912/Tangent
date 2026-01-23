import AppLayout from "./layout/AppLayout.jsx";
import RaceCard from "./components/NextRace/RaceCard.jsx";
import CountdownCard from "./components/Countdown/CountdownCard.jsx";
import DriverStandings from "./components/DriverStandings/Standings.jsx";
import ConstructorStandings from "./components/ConstructorStandings/Standings.jsx";
import "./components/DriverStandings/DriverStandings.css";
import "./components/ConstructorStandings/ConstructorStandings.css";
function App() {
  return (
    <>
      <AppLayout >
        <h1>Dashboard Content</h1>
        <RaceCard
        raceName="British Grand Prix"
        location ="Silverstone, UK"
        date="12 Feb 2026"
        />
        <CountdownCard />
        <ConstructorStandings />
        <DriverStandings />
      </AppLayout>
    </>
  );
}

export default App;
