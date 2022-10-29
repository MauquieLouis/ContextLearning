//-----------------------------
// Import react things 
//-----------------------------
import * as React from 'react';
//-----------------------------
// Import things for contexts
//-----------------------------
import {UserContextProvider, useUserContext } from "./src/context/userContext";
import {MessagingContextProvider, useMessagingContext } from "./src/context/messagingContext";
import { MessagingSubscriptionContextProvider, useMessagingSubscriptionContext } from './src/context/messagingsSubscriptionContext';
import { ToastProvider } from 'react-native-toast-notifications';
import { NativeBaseProvider } from "native-base";
//-----------------------------
// Import Navigator beach
//-----------------------------
import MyNavigator from './navigation/navigation';



export default function App(){
		
//		const {userContext} = useUserContext();
//		const {messagingContext} = useMessagingSubscriptionContext();
	
		return(
			<NativeBaseProvider>
			<ToastProvider>
				<UserContextProvider>
					<MessagingContextProvider>
						<MyNavigator />
					</MessagingContextProvider>
				</UserContextProvider>
			</ToastProvider>
			</NativeBaseProvider>
		);
	
}