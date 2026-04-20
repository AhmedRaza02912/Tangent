import { useState } from "react";
import F1Dashboard from "./pages/F1Dashboard";

function App(){
  const [activeSeries, setActiveSeries] = useState("f1");

  return(
    <>
     <F1Dashboard></F1Dashboard>
    </>
  );
}
export default App;
