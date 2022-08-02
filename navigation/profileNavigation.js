// navigation/profileNavigations.js
//-----------------------------
// Import all react bullshit and navigation
//-----------------------------
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//-----------------------------
// Import all component
//-----------------------------
import ProfileScreen from '../src/screens/profile/profileScreen';


//Create a navigator
const ProfileNavigator = createNativeStackNavigator();

// profile Navigation
const ProfileNavigation = () => {
	
	return(
		<ProfileNavigator.Navigator screenOptions={{headerShown: false}}>
			{/** login Screen */}
		<ProfileNavigator.Screen name="seeProfile" component={ProfileScreen}/>
			{/** New Account Screen */}
			{/**<ProfileNavigator.Screen name="avatar" component={Avatar}/> */}
		</ProfileNavigator.Navigator>
	);
	
}

export default ProfileNavigation;