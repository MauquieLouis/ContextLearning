// navigation/profileNavigations.js
//-----------------------------
// Import all react bullshit and navigation
//-----------------------------
import React, {useEffect, useState} from 'react';
import {Button, Text, TouchableHighlight, Alert, Image} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import gStyles from '../src/static/styles/globalStyle/globalStyle';
//-----------------------------
// Import all screens
//-----------------------------
import MessagingsScreen from '../src/screens/messagings/messagingsScreen';
import MessagingScreen from '../src/screens/messagings/messagingScreen';
import SearchScreen from '../src/screens/messagings/searchScreen';
//-----------------------------
// Font awesome icons
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
//-----------------------------
// DisplayProfilePicture Component
//-----------------------------
import  DisplayProfilePicture from '../src/components/displayProfilePicture';

import { useUserContext } from "../src/context/userContext";

//Create a navigator
const MessagingNavigator = createNativeStackNavigator();

// profile Navigation
const MessagingNavigation = () => {
	
	const { darkTheme } = useUserContext();
	
	const [dark_theme, setDarkTheme] = useState(darkTheme);
	
	useEffect(() => {
		if(darkTheme != undefined){
				setDarkTheme(darkTheme);
			}
	}, [darkTheme]);
	
	return(
		<MessagingNavigator.Navigator screenOptions={{headerShown: true}}>
			<MessagingNavigator.Screen name="messagings" component={MessagingsScreen}
			options={{
		          headerTitle: (props) => <Text>Messagings</Text>,
		          headerRight: () => (
						<>
		            		<DisplayProfilePicture width={40} height={40} borderRadius={25}/>
						</>
		          ),
        		}}
			/>
			<MessagingNavigator.Screen name="messaging" component={MessagingScreen} initialParams={{ userId: 42 }} 
				options={{
		          headerTitle: (props) => <Text>Messagings</Text>,
		          headerRight: () => (
						<>
		            		<DisplayProfilePicture width={40} height={40} borderRadius={25}/>
						</>
		          ),
        		}}/>
			<MessagingNavigator.Screen name="search" component={SearchScreen} options={{
		          headerTitle: (props) => <Text>Search a messaging</Text>,
		          headerRight: () => (
						<>
		            		<DisplayProfilePicture width={40} height={40} borderRadius={25}/>
						</>
		          ),
        		}}/>
		</MessagingNavigator.Navigator>
	);
	
}

export default MessagingNavigation;