import AppLayout from "./layout/AppLayout.jsx";
import RaceCard from "./components/NextRace/RaceCard.jsx";
import CountdownCard from "./components/Countdown/CountdownCard.jsx";

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
      </AppLayout>
    </>
  );
}

export default App;
