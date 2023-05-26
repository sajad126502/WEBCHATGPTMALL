import CIcon from "@coreui/icons-react";
import {
  cilLowVision,
  cilCheckCircle,
  cilBackspace,
  cilHome,
} from "@coreui/icons";
import { Context } from "../context/contextApi";

import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function Settings() {
  const {
    active,
  } = useContext(Context);

  const [micropsoftInputType, setMicropsoftInputType] = useState("password");
  const [chatgptmallInputType, setChatgptmallInputType] = useState("password");
  const [openaiInputType, setOpenaiInputType] = useState("password");

  const [microsoftEditedValue, setMicrosoftEditedValue] = useState(
    localStorage.getItem("microsoft_apikey")
  );
  const [openaiEditedValue, setOpenaiEditedValue] = useState(
    localStorage.getItem("openAi_apiKey")
  );
  const [chatgptmallEditedValue, setChatgptmallEditedValue] = useState(
    localStorage.getItem("chatgptmall_apikey")
  );

  const editMicrosoftApiKey = (e) => {
    setMicrosoftEditedValue(e.target.value);
  };
  const editChatgptmallApiKey = (e) => {
    setChatgptmallEditedValue(e.target.value);
  };
  const editOpenaiApiKey = (e) => {
    setOpenaiEditedValue(e.target.value);
  };

  const saveMicrosoftKeyToLocalStorage = () => {
    localStorage.setItem("microsoft_apikey", microsoftEditedValue);
    toast.success("Changed Saved Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const saveChatgptmallKeyToLocalStorage = () => {
    localStorage.setItem("chatgptmall_apikey", chatgptmallEditedValue);
    toast.success("Changed Saved Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const saveOpenaiKeyToLocalStorage = () => {
    localStorage.setItem("openAi_apiKey", openaiEditedValue);
    toast.success("Changed Saved Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <>
      <div className="settings">
        <div className={`settings-wrapper ${active ? 'active' : ''}`}>
          <div className="header">
            <span>SETTINGS</span>
            <Link to={"/"} className="back-icon">
              <CIcon icon={cilHome} />
            </Link>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              className="form-control form-control-sm"
            />
          </div>
          <div className="api-keys-wrapper mt-4">
            <div className="api-keys-header mt-4">
              <p>API KEYS</p>
            </div>
            <ol className="api-keys pt-4">
              {/* Microsoft */}
              <li className="d-flex align-items-center  gap-3 mb-3">
                <span>Microsoft - </span>
                <input
                  type={micropsoftInputType}
                  placeholder="API KEY"
                  onChange={editMicrosoftApiKey}
                  value={microsoftEditedValue}
                  className="form-control form-control-sm"
                />
                <span
                  className="eye-icon"
                  onClick={() => {
                    micropsoftInputType === "password"
                      ? setMicropsoftInputType("text")
                      : setMicropsoftInputType("password");
                  }}
                >
                  {micropsoftInputType === "password" ? (
                    <CIcon icon={cilLowVision} />
                  ) : (
                    <CIcon icon={cilBackspace} />
                  )}
                </span>
                <span
                  className="check-icon"
                  onClick={saveMicrosoftKeyToLocalStorage}
                >
                  <CIcon icon={cilCheckCircle} />
                </span>
              </li>

              {/* Chatgptmall */}
              <li className="d-flex align-items-center gap-3 mb-3">
                <span>Chatgptmall - </span>
                <input
                  type={chatgptmallInputType}
                  placeholder="API KEY"
                  onChange={editChatgptmallApiKey}
                  value={chatgptmallEditedValue}
                  className="form-control form-control-sm"
                />
                <span
                  className="eye-icon"
                  onClick={() => {
                    chatgptmallInputType === "password"
                      ? setChatgptmallInputType("text")
                      : setChatgptmallInputType("password");
                  }}
                >
                  {chatgptmallInputType === "password" ? (
                    <CIcon icon={cilLowVision} />
                  ) : (
                    <CIcon icon={cilBackspace} />
                  )}
                </span>
                <span
                  className="check-icon"
                  onClick={saveChatgptmallKeyToLocalStorage}
                >
                  {" "}
                  <CIcon icon={cilCheckCircle} />
                </span>
              </li>

              {/* Openai */}
              <li className="d-flex align-items-center gap-3 mb-3">
                <span> Openai - </span>
                <input
                  type={openaiInputType}
                  placeholder="API KEY"
                  onChange={editOpenaiApiKey}
                  value={openaiEditedValue}
                  className="form-control form-control-sm"
                />
                <span
                  className="eye-icon"
                  onClick={() => {
                    openaiInputType === "password"
                      ? setOpenaiInputType("text")
                      : setOpenaiInputType("password");
                  }}
                >
                  {" "}
                  {openaiInputType === "password" ? (
                    <CIcon icon={cilLowVision} />
                  ) : (
                    <CIcon icon={cilBackspace} />
                  )}
                </span>
                <span
                  className="check-icon"
                  onClick={saveOpenaiKeyToLocalStorage}
                >
                  {" "}
                  <CIcon icon={cilCheckCircle} />
                </span>
              </li>
            </ol>
          </div>
        </div>
      </div>
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
