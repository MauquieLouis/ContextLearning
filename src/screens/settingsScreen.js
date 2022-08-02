// components/screens/settingsScreen.js
//-----------------------------
// Import all stranges modules from react / native / navigation
//-----------------------------
import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, TextInput, Input, Button} from 'react-native';

//import {AppContextProvider, useAppContext } from "../context/appContext";


//Settings Screen
const SettingsScreen = () => {
	
//	const {username, country} = useAppContext();
	
	return(
	<View>
		<Text>
			Settings screen
			{/** <Text>{username} from {country}</Text>*/}
		</Text>      
	</View>
	);
}

export default SettingsScreen;

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
	input: {
    	height: 40,
    	margin: 12,
    	borderWidth: 1,
    	padding: 10,
  	},
});