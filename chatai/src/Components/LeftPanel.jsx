import React, { useContext, useState } from "react";
import { FaKey, FaCheck, FaArrowLeft, FaHammer } from "react-icons/fa";
import { Context } from "../context/contextApi";

export default function LeftPanel() {
  const {
    openaiKey,
    setOpenaiKey,
    microsoftKey,
    setmicrosoftKey,
    chataimallKey,
    setchataimallKey,
    AI,
    showAI,
  } = useContext(Context);

  return (
    <div className="left-panel d-flex flex-column justify-content-between">
      <div className="upper-section">
        <input
          type="text"
          placeholder="Search..."
          className="form-control py-2 mx-auto mt-2"
        />
      </div>
      <div className="lower-section">
        <ul className="list-group rounded-0">
          <li className="list-group-item d-flex gap-2 text-start border-0 text-white mx-2 my-1 mt-4 rounded-3">
            <span>
              <FaKey />
            </span>
            {!openaiKey && (
              <span
                onClick={() => {
                  setOpenaiKey(true);
                }}
              >
                Openai Key
              </span>
            )}
            {openaiKey && (
              <span className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Api Key"
                />
                <span
                  onClick={() => {
                    setOpenaiKey(false);
                    showAI(true)
                  }}
                >
                  <FaCheck />
                </span>
                <span
                  onClick={() => {
                    setOpenaiKey(false);
                    showAI(true)
                  }}
                >
                  <FaArrowLeft />
                </span>
              </span>
            )}
          </li>
          <li className="list-group-item d-flex gap-2 text-start border-0 text-white mx-2 my-1 rounded-3">
            <span>
              <FaKey />
            </span>

            {!microsoftKey && (
              <span
                onClick={() => {
                  setmicrosoftKey(true);
                  showAI(true)
                }}
              >
                Microsoft Openai Key
              </span>
            )}
            {microsoftKey && (
              <span className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Api Key"
                />
                <span
                  onClick={() => {
                    setmicrosoftKey(false);
                    showAI(true)
                  }}
                >
                  <FaCheck />
                </span>
                <span
                  onClick={() => {
                    setmicrosoftKey(false);
                    showAI(true)
                  }}
                >
                  <FaArrowLeft />
                </span>
              </span>
            )}
          </li>
          <li className="list-group-item d-flex gap-2 text-start border-0 text-white mx-2 my-1 rounded-3">
            <span>
              <FaKey />
            </span>

            {!chataimallKey && (
              <span
                onClick={() => {
                  setchataimallKey(true);
                }}
              >
                Chatgptmall API Key
              </span>
            )}
            {chataimallKey && (
              <span className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Api Key"
                />
                <span
                  onClick={() => {
                    setchataimallKey(false);
                  }}
                >
                  <FaCheck />
                </span>
                <span
                  onClick={() => {
                    setchataimallKey(false);
                  }}
                >
                  <FaArrowLeft />
                </span>
              </span>
            )}
          </li>
          <li className="list-group-item d-flex gap-2 text-start border-0 text-white mx-2 my-1 mb-4 rounded-3">
            <span>
              <FaKey />
            </span>

            {!chataimallKey && (
              <span
                onClick={() => {
                  setchataimallKey(true);
                }}
              >
                Settings
              </span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
