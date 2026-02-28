import { useState } from "react";
import F1Dashboard from "./pages/F1Dashboard";

function App(){
  const [activeSeries, setActiveSeries] = useState("f1");

  return(
    <>
      {activeSeries === "f1" ? (
        <F1Dashboard activeSeries={activeSeries} onSeriesChange={setActiveSeries} />
      ) : (
        <MotoGPDashboard activeSeries={activeSeries} onSeriesChange={setActiveSeries} />
      )}
    </>
  );
}
export default App;
