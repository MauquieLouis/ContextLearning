// navigation/profileNavigations.js
//-----------------------------
// Import all react bullshit and navigation
//-----------------------------
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//-----------------------------
// Import all component
//-----------------------------
import MessagingsScreen from '../src/screens/messagings/messagingsScreen';
import MessagingScreen from '../src/screens/messagings/messagingScreen';
import SearchScreen from '../src/screens/messagings/searchScreen';


//Create a navigator
const MessagingNavigator = createNativeStackNavigator();

// profile Navigation
const MessagingNavigation = () => {
	
	return(
		<MessagingNavigator.Navigator screenOptions={{headerShown: false}}>
			<MessagingNavigator.Screen name="messagings" component={MessagingsScreen}/>
			<MessagingNavigator.Screen name="messaging" component={MessagingScreen} initialParams={{ userId: 42 }}/>
			<MessagingNavigator.Screen name="search" component={SearchScreen}/>
		</MessagingNavigator.Navigator>
	);
	
}

export default MessagingNavigation;