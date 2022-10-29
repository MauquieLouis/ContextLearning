// src/components/picturesComponent/pictureDisplay.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, StyleSheet, ActivityIndicator, ScrollView, Dimensions, Image, Button} from 'react-native';
import Loader from '../Loader';
import PictureDisplayB64 from './pictureDisplayB64'
//-----------------------------
// Import SupabaseClient
//-----------------------------
import { supabaseClient } from '../../../lib/initSupabase';
//-----------------------------
// End Import
//-----------------------------
//PictureDisplay Component
const PictureDisplay = (props) => {
	
	const [picture, setPicture] = useState(null);
	
	useEffect(() => {
		console.log("Props in pictureDisplay")
		console.log(props)
		PreparePicture(props["picture"])
	}, []);
	
	function PreparePicture(picture){
		var base64Data;
		const fileReaderInstance = new FileReader();
		fileReaderInstance.readAsDataURL(picture);
		fileReaderInstance.onload = () => {
			base64Data = fileReaderInstance.result;
			setPicture(base64Data);
		}
	}
	
	return (
		<View>
			<Image  
				source={{ uri: picture}} 
				style={{
					width:props["width"] ,
					height:props["height"] ,
					borderRadius:props["borderRadius"]
					}}
				/>
		</View>
	);
}

// Export component -------
export default PictureDisplay;