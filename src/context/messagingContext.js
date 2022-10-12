// /src/context/messagingContext.js
import * as React from 'react';
import { createContext, useContext, useEffect, useRef, useState} from "react";
import { supabaseClient  } from '../../lib/initSupabase';
import { useUserContext } from './userContext';

export const MessagingContext = createContext({
  	newMessage : false,
	lastMessage: null,
	reduceNumberOfUnreadMessaging: null,
	setNewMessageFalse: null
});

//CHANGE EVERYTHING FOR MESSAGING CONTEXT
export const MessagingContextProvider = ({ props, children }) => {
	
	const { user } = useUserContext();
	const [messagingsToDisplay,setMessagingsToDisplay] = useState(null);
	const [lastMessage, setLastMessage] = useState(null);
	const [newMessage, setNewMessage] = useState(false);	
	const [numberOfUnreadedMessaging, setNumberOfUnreadedMessaging] = useState(0);
	
	//------ USE EFFECT ------- //
	useEffect(() => {
		if(user){
			console.log("SET THE MESSAGE LISTENER");
			const messages = supabaseClient.from('message:receiver=eq.'+user["id"]).on('*', payload => {
				console.log("NEW MESSAGE received or deleted ...");
				//Put this conv at the top ...
				setLastMessage(payload["new"]);
				/**
					TODO
					create notification and display the new message.
				 */
				//Just to trigger new message received function ... not optimized
				newMessage ? setNewMessage(false) : setNewMessage(true);
				setNumberOfUnreadedMessaging(numberOfUnreadedMessaging+1);
			}).subscribe();
		}
		return () => {
		};
	},[user]);
	
	function reduceNumberOfUnreadMessaging(){
		setNumberOfUnreadedMessaging(numberOfUnreadedMessaging-1);
	}
	
	function setNewMessageFalse(){
		setNewMessage(false);
	}
	
	const value = {
		newMessage,
		lastMessage,
		reduceNumberOfUnreadMessaging,
		setNewMessageFalse,
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