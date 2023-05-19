import { FaArrowLeft, FaCheck, FaHammer, FaKey } from "react-icons/fa";
import { Context } from "../context/contextApi";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LeftNav() {
  const {
    active,
    setActive,
    showOpenaiApiForm,
    setShowOpenaiApiForm,
    openAiKey,
    setOpenAiKey,
  } = useContext(Context);

  return (
    <>
      <FaArrowLeft
        onClick={() => {
          setActive(!active);
        }}
        className={`arrow ${active ? "rotate" : ""}`}
      ></FaArrowLeft>
      <div
        className={`left-nav ${
          active ? "hideNav" : "showNav"
        } d-flex flex-column justify-content-between`}
      >
        <div className="upper-section">
          <form>
            <input
              type="text"
              placeholder="Search..."
              className="form-control mt-2 py-2"
            />
          </form>
        </div>
        <div className="lower-section">
          <ul className="list-group m-2 pt-3 rounded-0">
            <li className="d-flex gap-3 py-2 my-1 list-group-item border-0 rounded-3">
              <span className="icon">
                <FaKey></FaKey>
              </span>
              {!showOpenaiApiForm && (
                <>
                  <span
                    onClick={() => {
                      setShowOpenaiApiForm(true);
                    }}
                  >
                    OpenAi API Key
                  </span>
                </>
              )}
              {showOpenaiApiForm && (
                <form className="d-flex align-items-center gap-2">
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="Api Key"
                    className="form-control form-control-sm"
                    value={openAiKey}
                    onChange={(e) => {
                      setOpenAiKey(e.target.value);
                    }}
                  />
                  <span className="btn btn-sm text-white p-0 ">
                    <FaCheck
                      onClick={() => {
                        localStorage.setItem("openAiKey", openAiKey);
                        // toast("Api Key Stored in Local Storage.");
                        setShowOpenaiApiForm(false);
                        console.log("Api Key Stored in Local Storage.");
                      }}
                    ></FaCheck>
                  </span>
                  <span className="btn btn-sm text-white p-0 ">
                    <FaArrowLeft
                      onClick={() => {
                        setShowOpenaiApiForm(false);
                      }}
                    ></FaArrowLeft>
                  </span>
                </form>
              )}
            </li>
            <li className="d-flex gap-3 py-2 my-1 list-group-item border-0 rounded-3">
              <span className="icon">
                <FaKey></FaKey>
              </span>
              <span>Microsoft API Key</span>
            </li>
            <li className="d-flex gap-3 py-2 my-1 list-group-item border-0 rounded-3">
              <span className="icon">
                <FaKey></FaKey>
              </span>
              <span>Chatgptmall API Key</span>
            </li>
            <li className="d-flex gap-3 py-2 my-1 list-group-item border-0 rounded-3">
              <span className="icon">
                <FaHammer></FaHammer>
              </span>
              <span>Search</span>
            </li>
          </ul>
        </div>
      </div>

      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ToastContainer /> */}
    </>
  );
}
