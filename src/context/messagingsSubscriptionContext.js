import React, { useState, useEffect, createContext,useContext } from 'react';
import { supabaseClient  } from '../../lib/initSupabase';

export const MessagingSubscriptionContext = createContext({});

export const MessagingSubscriptionContextProvider = ({props, children}) => {
	
	//Normaly we should already have access to session and user, thanks to userContext...
	const {session, user} = useUserContext();
	//To Check

	let mySubscription = null;
	const [error, setError] = useSate("");
	const [messages, setMessages] = useState([]);
	const [newIncomingMessageTrigger, setNewIncomingMessageTrigger] = useState(null);
	const [unviewedMessageCount, setUnviewedMessageCount] = useState(0);
	
	useEffect(() => {
		getMessagesAndSubscribe();
		
		
	},[]);
	
	const getInitialMessages = async () => {
		if(!messages.length){
			const { data, error } = await supabaseClient.from('message').select().eq('messaging', 20).range(0,30);
			//End the loading
			
			if(error){
				setError(error.message);
				supabase.removeSubscription(mySubscription);
				mySubscription = null;
				return;
			}
			setMessages(data);
			//Scroll To Bottom
		}
	}
	
	const getMessagesAndSubscribe = async () => {
		setError("");
		if(!mySubscription){
			getInitialMessages();
			mySubscription = supabaseClient.from("message:messaging=eq.20").on("*",(payload) => {
				console.log("Change in this messaging !! LOLOLOLOLOL");
				//handleNewMessage(payload);
			}).subscribre();
			//mySubscription = supabaseClient.from('message:messaging='+idMessaging).on('INSERT',handleInsertNewMessage).subscribe()
		}
	}
	
	const value = {
		error,
		messages,
		getMessagesAndSubscribe,
		unviewedMessageCount,
	};
	
	return (
		<MessagingSubscriptionContext.Provider value={value} {...props}>
			{children}
		</MessagingSubscriptionContext.Provider>
		);
	//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
	// - - - - - - - - - - - - - - E N D - - - - - - - - - - - - - - - - - - //
	//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
}

export const useMessagingSubscriptionContext = () => {
	const context = useContext(MessagingSubscriptionContext);
	if(context === undefined) {
		throw new Error('useMessagingSubscription must be used within a MessagingSubscriptionContextProvider');
	}
	return context;
};