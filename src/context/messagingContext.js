// /src/context/messagingContext.js
import * as React from 'react';
import { createContext, useContext, useEffect, useRef, useState} from "react";
import { supabaseClient  } from '../../lib/initSupabase';
import { useUserContext } from './userContext';

export const MessagingContext = createContext({
  	messagingsToDisplay: null,
	lastMessage: null,
});

//CHANGE EVERYTHING FOR MESSAGING CONTEXT
export const MessagingContextProvider = ({ props, children }) => {
	
	const { user } = useUserContext();
	const [messagingsToDisplay,setMessagingsToDisplay] = useState(null);
	const [areListenerSet, setAreListenerSet] = useState(false);	
	const [lastMessage, setLastMessage] = useState(null);
//	const 

	async function LoadMessaging(){
		if(messagingsToDisplay != null){
			return;
		}
		var messagings = [];
		//FOR THE FUTURE , CHANGE THIS BY SAVING IN LOCAL STORAGE ALL MESSAGING's ID TO LISTEN TO
		//OR CREATE A SERVICE THAT IS LISTENING TO ALL MESSAGING AND WHEN A MESSAGING UPDATE, SEND ALERT
		try{
			//Get all messaging_id and users in messaging, not very optimized ...
			let { data : usersMessaging, error } = await supabaseClient.from('messaging').select("*");
			console.log("USERMESSAGING ------");
			usersMessaging.forEach(element => {
				//Parse the response to a json array
				var JSONarr = JSON.parse(element["users"]);
				//Then for each user in this table check if user connected is in
				Object.values(JSONarr).forEach(userId => {
					if(userId == user["id"]){
						//Then if user is in -> add messaging to messaging to subscribe
						messagings.push(element["id"]);
					}
				});
			});
			console.log("USERMESSAGING ------");
		}catch(error){
			console.log("ERROR ...");
			console.log(error);
		}finally{
			setMessagingsToDisplay(messagings);
		}
	}
	//------ USE EFFECT ------- //
	useEffect(() => {
		if(user){
			console.log("SET THE MESSAGE LISTENER");
			const messages = supabaseClient.from('message:receiver=eq.'+user["id"]).on('*', payload => {
				console.log("NEW MESSAGE received or deleted ...");
				//Put this conv at the top ...
				setLastMessage(payload["new"]);
			}).subscribe();
		}
		return () => {
		};
	},[user]);
	
	const value = {
		messagingsToDisplay,
		lastMessage,
	};
	
	return (<MessagingContext.Provider value={value} {...props}>
				{children}
			</MessagingContext.Provider>
			);
	//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
	// - - - - - - - - - - - - - - E N D - - - - - - - - - - - - - - - - - - //
	//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
}

export const useMessagingContext = () => {
	const context = useContext(MessagingContext);
	if(context === undefined){
		throw new Error('useMessaging must be used within a MessagingContextProvider.')
	}
	return context;
}