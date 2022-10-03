// /src/context/messagingContext.js
import * as React from 'react';
import { createContext, useContext, useEffect, useRef, useState} from "react";
import { supabaseClient  } from '../../lib/initSupabase';
import { useUserContext } from './userContext';

export const MessagingContext = createContext({
  messagingsToListen: null,
});

//CHANGE EVERYTHING FOR MESSAGING CONTEXT
export const MessagingContextProvider = ({ props, children }) => {
	
	const { user } = useUserContext();
	const [messagingsToListen,setMessagingsToListen] = useState(null);
	const [areListenerSet, setAreListenerSet] = useState(false);	
//	const 

	async function LoadMessaging(){
		if(messagingsToListen != null){
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
			setMessagingsToListen(messagings);
		}
	}
	//------ USE EFFECT ------- //
	useEffect(() => {
		
		if(user){
			console.log("IF user !")
			LoadMessaging();
			if(!areListenerSet){
				
			if(messagingsToListen){
				messagingsToListen.forEach(messaging => {
					console.log(messaging);
//					console.log("CREATE MESSAGING LISTENER !");
					const messagingSub = supabaseClient.from('messaging:id=eq.'+messaging).on('*',payload => {
						console.log("UPDATE IN MESSAGING :"+messaging);
//						console.log(payload);
						setMessagingsToListen(payload["new"]);
					}).subscribe();
					setAreListenerSet(true);
//					console.log("END CREATING MESSAGING LISTENER !");
				});
			}
			}
		}
		
		return () => {
//			supabaseClient.removeAllSubscriptions();
		};
	},[user, messagingsToListen]);
	
	const value = {
		messagingsToListen,
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