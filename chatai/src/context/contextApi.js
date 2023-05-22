import axios from "axios";
import React, { createContext, useState } from "react";

export const Context = createContext();

export const AppContext = (props) => {
  let Data = [];

  const BaseUrl = "https://chatgptmall.tech/api/v1/";
  const [active, setActive] = useState(false);
  const [showOpenaiApiForm, setShowOpenaiApiForm] = useState(false);
  const [showChatgptmallApiForm, setShowChatgptmallApiForm] = useState(false);
  const [microSoftApiForm, setMicroSoftApiForm] = useState(false);
  const [microSoftEndPoint, setMicroSoftEndPoint] = useState(false);
  const [ApiKey, setApiKey] = useState("");
  const [endpoint, setEndPoint] = useState("");
  const [response, setresponse] = useState([]);
  const [responseText, setresponseText] = useState([]);
  const [responseInput, setresponseInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const body = {
    input: searchQuery,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("chatgptmall_apikey")}`,
    },
  };

  const fetchData = async (apiUrl, body, requestOptions = {}) => {
    try {
      const res = await axios.post(apiUrl, body, requestOptions);
      setresponseText(res.data.response);
      Data.push(...response, res.data);
      console.log(Data);
      setresponse(Data);
      setresponseInput(res.data.input);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const openai_textToText = () => {
    setLoading(true);
    const apiUrl = BaseUrl + "openai/text_to_text/";
    const params = {
      openai_key: localStorage.getItem("openAi_apiKey"),
    };
    const requestOptions = { params };
    fetchData(apiUrl, body, requestOptions);
  };

  const chatgptmall_textToText = () => {
    setLoading(true);
    const apiUrl = BaseUrl + "text_to_text/";
    const requestOptions = { headers: config.headers };
    fetchData(apiUrl, body, requestOptions);
  };

  const microsoft_textToText = () => {
    setLoading(true);
    const apiUrl = BaseUrl + "ms/text_to_text/";
    const body = {
      input: searchQuery,
      endpoint: localStorage.getItem("microsoft_endpoint"),
      ms_key: localStorage.getItem("microsoft_apikey"),
    };
    fetchData(apiUrl, body);
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
        microSoftApiForm,
        setMicroSoftApiForm,
        microSoftEndPoint,
        setMicroSoftEndPoint,
        microsoft_textToText,
        ApiKey,
        setApiKey,
        endpoint,
        setEndPoint,
        responseText,
        setresponseText,
        searchQuery,
        setSearchQuery,
        openai_textToText,
        chatgptmall_textToText,
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
