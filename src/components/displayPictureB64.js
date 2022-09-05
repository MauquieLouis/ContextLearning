// src/components/displayPictureB64.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, StyleSheet, ActivityIndicator, ScrollView, Dimensions, Image, Button, Animated} from 'react-native';
import Loader from '../components/Loader';
//-----------------------------
// Import SupabaseClient
//-----------------------------
import { supabaseClient } from '../../lib/initSupabase';
//-----------------------------
// End Import
//-----------------------------
//DisplayPictureB64 Component
const DisplayPictureB64 = (props) => {
	
	useEffect(() => {
		console.log("PROPS B64: ")
		console.log(props);
	}, []);
	
  return (
	<View>
		<Animated.Image source={{uri:props["base64"]}} alt="Avatar" className="avatar image" 
			style={{
				width:props["width"],
				height:props["height"],
				borderRadius:props["borderRadius"]
			}}/>
	</View>
  );
}

// Export component -------
export default DisplayPictureB64;