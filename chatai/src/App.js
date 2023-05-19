import React from "react";
import "./App.scss";
import { AppContext } from "./context/contextApi";
import LeftNav from "./Components/LeftPanel";
import CenterNav from "./Components/CenterPanel";

function App() {
  return (
    <AppContext>
      <div className="App d-flex">
        <LeftNav />
        <CenterNav />
      </div>
    </AppContext>
  );
}

export default App;
