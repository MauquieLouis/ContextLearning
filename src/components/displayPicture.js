// src/components/displayPicture.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, StyleSheet, ActivityIndicator, ScrollView, Dimensions, Image, Button} from 'react-native';
import Loader from '../components/Loader';
//-----------------------------
// Import SupabaseClient
//-----------------------------
import { supabaseClient } from '../../lib/initSupabase';
//-----------------------------
// End Import
//-----------------------------
//Profile Screen
const DisplayPicture = (props) => {
	
	const [imgLoading, setImgLoading] = useState(false);
	const [avatarUrl, setAvatarUrl] = useState(null);
	
	useEffect(() => {
		console.log("PROPS : ")
		console.log(props);
		downloadImage(props["uri"])
	}, []);
	
	async function downloadImage(path){
		try{
			setImgLoading(true);
			const { data, error } = await supabaseClient.storage.from('avatars').download(path);
			if(error){
				console.log("Error download : "+error);
				console.log('Maybe data : '+data);
				throw error
			}
			var base64Data;
			const fileReaderInstance = new FileReader();
			fileReaderInstance.readAsDataURL(data);
			fileReaderInstance.onload = () => {
				base64Data = fileReaderInstance.result;
				setAvatarUrl(base64Data);
			}
			console.log('download Succeed !')
		} catch (error) {
			console.log('Error downloading image: ', error.message);
		}finally{
			setImgLoading(false);
		}
	}
	
	if(imgLoading){
		return(
			<Loader/>
		);
	}
  return (
	<View>
		<Image source={{uri:avatarUrl}} alt="Avatar" className="avatar image" 
			style={{
				width:props["width"],
				height:props["height"],
				borderRadius:props["borderRadius"]
			}}/>
	</View>
  );
}

// Export component -------
export default DisplayPicture;