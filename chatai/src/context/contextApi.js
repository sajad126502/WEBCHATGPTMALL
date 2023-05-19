import axios from "axios";
import React, { createContext, useState } from "react";

export const Context = createContext();

export const AppContext = (props) => {
  const BaseUrl = "https://chatgptmall.tech/api/v1/";
  const [active, setActive] = useState(false);
  const [showOpenaiApiForm, setShowOpenaiApiForm] = useState(false);
  const [openAiKey, setOpenAiKey] = useState("");
  const [responseText, setresponseText] = useState("");
  const [responseInput, setresponseInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const body = {
    input : searchQuery,
  }
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('openAiKey')}` }
};

   const  textToText  = async () => {
     setLoading(true)
     await axios.post(BaseUrl + "text_to_text/", body, config)
     .then((res) => {
        console.log(res.data.response)
        setresponseText(responseText.length > 0 ? responseText + "\n" + "\n" + "\n" + res.data.response : res.data.response)
        setresponseInput(res.data.input)
        setLoading(false)
     })
     .catch((err) => {
      setLoading(false)
        console.log(err)
     })
  }

  return (
    <Context.Provider
      value={{
        active,
        setActive,
        showOpenaiApiForm,
        setShowOpenaiApiForm,
        openAiKey,
        setOpenAiKey,
        responseText,
        setresponseText,
        searchQuery,
        setSearchQuery,
        textToText,
        responseInput,
        loading
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
