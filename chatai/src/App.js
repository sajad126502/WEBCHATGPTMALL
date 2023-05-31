import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.scss";
import { AppContext } from "./context/contextApi";
import LeftNav from "./Components/LeftPanel";
import CenterNav from "./Components/CenterPanel";
import Settings from "./Components/Settings";
import License from "./Components/License";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateLicene from "./Components/CreateLicene";

function App() {
  return (
    <>
      <AppContext>
        <BrowserRouter>
          <div className="App d-flex">
            <LeftNav />
            <Routes>
              <Route exact path="/" element={<CenterNav></CenterNav>} />
              <Route exact path="/settings" element={<Settings></Settings>} />
              <Route exact path="/license" element={<License></License>} />
              <Route exact path="/create-licenses" element={<CreateLicene></CreateLicene>} />
            </Routes>
          </div>
        </BrowserRouter>
      </AppContext>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
