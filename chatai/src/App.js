import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.scss";
import { AppContext } from "./context/contextApi";
import LeftNav from "./Components/LeftPanel";
import CenterNav from "./Components/CenterPanel";
import Settings from "./Components/Settings";

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        <div className="App d-flex">
          <LeftNav />
          <Routes>
            <Route exact path="/" element={<CenterNav></CenterNav>} />
            <Route exact path="/settings" element={<Settings></Settings>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext>
  );
}

export default App;
