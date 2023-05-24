import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../context/contextApi";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import {
  FaMicrophoneAltSlash,
  FaCopy,
  FaMicrophone,
  FaRobot,
  FaUser,
} from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";
import TypeWritter from "./TypeWritter";

export default function CenterNav() {
  const {
    active,
    searchQuery,
    setSearchQuery,
    openai_textToText,
    chatgptmall_textToText,
    microsoft_textToText,
    responseInput,
    loading,
    response,
    setLoading,
  } = useContext(Context);

  const divRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [convertedAudio, setConvertedAudio] = useState('false');

  let {
    transcript,
    listening,
    // resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }

  const copyContent = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const callApi = async (input) => {
    console.log("Calling API");
    console.log("searchQuery", searchQuery);
    if (localStorage.getItem("openAi_apiKey")) {
      await openai_textToText(input);
    } else if (localStorage.getItem("chatgptmall_apikey")) {
      await chatgptmall_textToText(input);
    } else if (localStorage.getItem("microsoft_apikey")) {
      await microsoft_textToText(input);
    }
  };

  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) divElement.scrollTop = divElement?.scrollHeight;
  }, []);
  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) divElement.scrollTop = divElement?.scrollHeight;
  }, [response]);

  useEffect(()=>{
    setConvertedAudio(transcript)
  },[transcript])

  return (
    <div className="center-nav">
      {loading && (
        <span className={`loader ${active ? "active" : ""}`}>
          {" "}
          <PulseLoader color="#ffffff" size={"10px"} />
        </span>
      )}
      {!(
        localStorage.getItem("openAi_apiKey") ||
        localStorage.getItem("chatgptmall_apikey") ||
        (localStorage.getItem("microsoft_apikey") &&
          localStorage.getItem("microsoft_endpoint"))
      ) && (
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
            <a href="https://www.chatbotui.com/">openai.com</a>
          </p>
        </div>
      )}
      {(localStorage.getItem("openAi_apiKey") ||
        localStorage.getItem("chatgptmall_apikey") ||
        (localStorage.getItem("microsoft_apikey") &&
          localStorage.getItem("microsoft_endpoint"))) && (
        <div
          id="chatbot"
          ref={divRef}
          className={`chatbot-ui ${active ? "active" : ""}`}
        >
          {!loading && responseInput.length < 1 && (
            <h2 className="text-center">Text To Text</h2>
          )}
          <span>|</span>
          {response?.map((res) => {
            return (
              <div className="response c_response d-flex flex-column text-white">
                <div className="input">
                  {(loading || res.input.length > 0) && (
                    <div
                      className={`user-query d-flex align-items-center gap-4 py-2 ${
                        active ? "active" : ""
                      }`}
                    >
                      <span className="ps-3">
                        <FaUser></FaUser>
                      </span>
                      <span
                        className="response-input"
                        style={{ fontSize: "1rem" }}
                      >
                        {res.input}
                      </span>
                    </div>
                  )}
                </div>
                <div className="response-text d-flex py-3 gap-4">
                  <span className="ps-3" style={{ fontSize: "2rem" }}>
                    {res.input && <FaRobot></FaRobot>}
                  </span>
                  <p>
                    <TypeWritter response={res.response} />
                  </p>
                  <span
                    onClick={() => {
                      copyContent(res.response);
                      res.isCopied = true;
                    }}
                    className="copy"
                  >
                    <FaCopy color="rgb(145 146 160);"></FaCopy>
                  </span>
                </div>
              </div>
            );
          })}
          <div className={`search-bar mt-5 ${active ? "active" : ""}`}>
            <input
              type="text"
              placeholder="Type a message or type '/' to select prompt..."
              className="form-control shadow"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              value={searchQuery || convertedAudio}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  setLoading(true);
                  callApi(searchQuery);
                  setSearchQuery("");
                }
              }}
            />
            <span
              onClick={() => {
                setRecording(!recording);
              }}
              className="microphone"
            >
              {!listening ? (
                <FaMicrophoneAltSlash
                  onClick={() => {
                    setSearchQuery("");
                    SpeechRecognition.startListening({ continuous: true });
                  }}
                  color="#ffffff"
                ></FaMicrophoneAltSlash>
              ) : (
                <FaMicrophone
                  onClick={() => {
                    SpeechRecognition.stopListening();
                    callApi(transcript);
                    setConvertedAudio('')
                  }}
                  color="#ffffff"
                ></FaMicrophone>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
