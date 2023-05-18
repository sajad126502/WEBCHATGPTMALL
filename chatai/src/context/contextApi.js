import React, {createContext, useEffect, useState} from "react";


export const Context = createContext();

export const AppContext = (props) => {
       

	const [openaiKey, setOpenaiKey] = useState(false);
	const [microsoftKey, setmicrosoftKey] = useState(false);
	const [chataimallKey, setchataimallKey] = useState(false);
	const [AI, showAI] = useState(false);
	const [userQuery, setUserQuery] = useState('');


	return (
		<Context.Provider
			value={{
				openaiKey, setOpenaiKey,microsoftKey, setmicrosoftKey,chataimallKey, setchataimallKey , AI, showAI, userQuery, setUserQuery
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
