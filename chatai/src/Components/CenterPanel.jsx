import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/contextApi";
import { FaRobot, FaUser } from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";

export default function CenterNav() {
  const {
    active,
    responseText,
    searchQuery,
    setSearchQuery,
    textToText,
    responseInput,
    loading,
  } = useContext(Context);

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (displayedText.length < responseText.length) {
        setDisplayedText(responseText.substring(0, displayedText.length + 1));
      } else {
        clearInterval(typingEffect);
      }
    }, 40);

    return () => {
      clearInterval(typingEffect);
    };
  }, [displayedText.length, responseText]);

  return (
    <div className="center-nav">
      {!localStorage.getItem("openAiKey") && (
        <div className={`home-page text-center ${active ? "active" : ""}`}>
          <h2>Welcome to Chatbot UI</h2>
          <p className="lead">
            Chatbot UI is an open source clone of OpenAI's ChatGPT UI.
          </p>
          <h5>Important: Chatbot UI is 100% unaffiliated with OpenAI.</h5>
          <p className="text-small">
            Chatbot UI allows you to plug in your API key to use this UI with
            their API.
          </p>
          <p className="text-small">
            It is only used to communicate with their API.
          </p>
          <p className="text-small">
            Please set your OpenAI API key in the bottom left of the sidebar.
          </p>
          <p className="text-small">
            If you don't have an OpenAI API key, you can get one here:{" "}
            <a target="_blank" href="https://www.chatbotui.com/">
              openai.com
            </a>
          </p>
        </div>
      )}
      {(loading || responseInput.length > 0) && (
        <div
          className={`user-query d-flex align-items-center gap-4 py-4 ${
            active ? "active" : ""
          }`}
        >
          <span>
            <FaUser></FaUser>
          </span>
          <span className="response-input">
            {responseInput && !loading ? (
              responseInput
            ) : (
              <PulseLoader color="#ffffff" size={"4x"} />
            )}
          </span>
        </div>
      )}
      {localStorage.getItem("openAiKey") && (
        <div className={`chatbot-ui ${active ? "active" : ""}`}>
          {!loading && responseInput.length < 1 && (
            <h2 className="text-center">Chatbot UI</h2>
          )}
          <div className="response d-flex gap-4 text-white">
            <span style={{ fontSize: "2rem" }}>
              {responseText && <FaRobot></FaRobot>}
            </span>

            {displayedText && (
              <p class="blinking-slash">
                {displayedText} <span>|</span>
              </p>
            )}
          </div>
          <div className="search-bar mt-5">
            <input
              type="text"
              placeholder="Type a message or type '/' to select prompt..."
              className="form-control shadow"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              value={searchQuery}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  textToText();
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
