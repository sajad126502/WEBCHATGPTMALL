import React, { useContext, useState, useEffect } from "react";
import { FaUser, FaRobot, FaSearch } from "react-icons/fa";

import { Context } from "../context/contextApi";

export default function CenterPanel() {
  const { AI, userQuery, setUserQuery , openaiKey} = useContext(Context);

  const [displayText, setDisplayText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    if (userQuery) {
      const data =
        "India, officially known as the Republic of India, is a country located in South Asia. It is the seventh-largest country by land area and the second-most populous country in the world, with over 1.3 billion people. India shares its borders with Pakistan to the northwest, China and Nepal to the north, Bhutan to the northeast, and Bangladesh and Myanmar to the east. It is surrounded by the Indian Ocean on the south. India has a rich history dating back thousands of years. It was the birthplace of ancient civilizations such as the Indus Valley Civilization, which existed around 2500 BCE. Over the centuries, India has been ruled by various dynasties and empires, including the Maurya, Gupta, Mughal, and British Empires. India gained its independence from British colonial rule on August 15, 1947, and adopted a democratic system of governance.";
      setDisplayText(data);
    }
  }, [userQuery]);

  useEffect(() => {
    if (displayText && typingIndex < displayText.length) {
      const typingTimeout = setTimeout(() => {
        setTypingIndex((prevIndex) => prevIndex + 1);
      }, 10);

      return () => clearTimeout(typingTimeout);
    }
  }, [displayText, typingIndex]);

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      setUserQuery(e.target.value);
      console.log("enter press here! ");
    }
  };

  return (
    <div className="center-panel pt-5">
    {(!userQuery.length > 0 && AI ) &&  <h2 className="text-center my-auto">Chatbot UI</h2>}
      {AI && (
        <div>
          {userQuery.length > 0 && (
            <div>
              <div className="user-query d-flex align-items-center gap-4">
                <h2>
                  <FaUser></FaUser>
                </h2>
                <p className="lead user-query-text mt-4 text-white py-2">
                  {userQuery}
                </p>
              </div>
              <div className="response-text d-flex gap-4">
                <h2>
                  <FaRobot></FaRobot>
                </h2>
                <p className="lead text-white py-2">
                  {displayText.substr(0, typingIndex)}
                </p>
              </div>
            </div>
          )}
          <div className="search-query d-flex">
            <input
              type="text"
              className="form-control px-4 py-2"
              placeholder="Type a message or type '/' to select a prompt"
              onKeyUp={handleSubmit}
            />
          </div>
        </div>
      )}
      {!AI && (
        <div>
          <div className="intro d-flex flex-column justify-content-center align-items-center">
            <h2>Welcome to Chatgptmall API</h2>
            <p className="text-secondary">Please provide the API Key to contiue</p>
          </div>
        </div>
      )}
    </div>
  );
}
