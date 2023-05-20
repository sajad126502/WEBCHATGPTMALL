import axios from "axios";
import React, { createContext, useState } from "react";

export const Context = createContext();

export const AppContext = (props) => {
  let Data = [];

  const BaseUrl = "https://chatgptmall.tech/api/v1/";
  const [active, setActive] = useState(false);
  const [showOpenaiApiForm, setShowOpenaiApiForm] = useState(false);
  const [showChatgptmallApiForm, setShowChatgptmallApiForm] = useState(false);
  const [ApiKey, setApiKey] = useState("");
  const [response, setresponse] = useState([]);
  const [responseText, setresponseText] = useState([]);
  const [responseInput, setresponseInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const body = {
    input: searchQuery,
  };
  const params = {
    openai_key: `${localStorage.getItem("chatgptmall_apikey")}`,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("openAi_apiKey")}`,
    },
  };

  const textToText = async () => {
    setLoading(true);
    await axios
      .post(BaseUrl + "openai/text_to_text/", body, { params })
      .then((res) => {
        setresponseText(res.data.response);
        Data.push(...response, res.data);
        console.log(Data);
        setresponse(Data);
        setresponseInput(res.data.input);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Context.Provider
      value={{
        active,
        setActive,
        showOpenaiApiForm,
        setShowOpenaiApiForm,
        showChatgptmallApiForm,
        setShowChatgptmallApiForm,
        ApiKey,
        setApiKey,
        responseText,
        setresponseText,
        searchQuery,
        setSearchQuery,
        textToText,
        responseInput,
        loading,
        response,
        setLoading,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
