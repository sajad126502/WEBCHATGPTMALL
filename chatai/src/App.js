import React from "react";
import "./App.scss";
import { AppContext } from "./context/contextApi";
import LeftPanel from "./Components/LeftPanel";
import CenterPanel from './Components/CenterPanel';

function App() {
  return (
    <AppContext>
      <div className="App d-flex">
        <LeftPanel />
        <CenterPanel />
      </div>
    </AppContext>
  );
}

export default App;
