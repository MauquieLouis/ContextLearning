//-----------------------------
// Import react things 
//-----------------------------
import * as React from 'react';
//-----------------------------
// Import things for context
//-----------------------------
import {UserContextProvider, useUserContext } from "./src/context/userContext";
//-----------------------------
// Import Navigator beach
//-----------------------------
import MyNavigator from './navigation/navigation';



export default function App(){
		
		const {value} = useUserContext();
	
		return(
			<UserContextProvider>
				<MyNavigator />
			</UserContextProvider>
		);
	
}