//-----------------------------
// Import react things 
//-----------------------------
import * as React from 'react';
//-----------------------------
// Import things for contexts
//-----------------------------
import {UserContextProvider, useUserContext } from "./src/context/userContext";
import { MessagingSubscriptionContextProvider, useMessagingSubscriptionContext } from './src/context/messagingsSubscriptionContext';
//-----------------------------
// Import Navigator beach
//-----------------------------
import MyNavigator from './navigation/navigation';



export default function App(){
		
//		const {userContext} = useUserContext();
//		const {messagingContext} = useMessagingSubscriptionContext();
	
		return(
			<UserContextProvider>
				<MyNavigator />
			</UserContextProvider>
		);
	
}