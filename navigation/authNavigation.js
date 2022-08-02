// navigation/authNavigations.js
//-----------------------------
// Import all react bullshit and navigation
//-----------------------------
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//-----------------------------
// Import all component
//-----------------------------
import AuthScreen from '../src/screens/auth/loginScreen';
import NewAccountScreen from '../src/screens/auth/newAccountScreen';
import forgotPasswordScreen from '../src/screens/auth/forgotPasswordScreen';


//Create a navigator
const AuthNavigator = createNativeStackNavigator();

// profile Navigation
const AuthNavigation = () => {
	
	return(
		<AuthNavigator.Navigator screenOptions={{headerShown: false}}>
			{/** login Screen */}
			<AuthNavigator.Screen name="login" component={AuthScreen} title="Sign in"/>
			{/** New Account Screen */}
			<AuthNavigator.Screen name="newAccount" component={NewAccountScreen} title="Sign up"/>
			{/** Forgot Password Screen */}
			<AuthNavigator.Screen name="forgotPassword" component={forgotPasswordScreen} title="Forgot Password"/>
		</AuthNavigator.Navigator>
	);
	
}

export default AuthNavigation;