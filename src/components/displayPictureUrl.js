// src/components/displayPictureUrl.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, StyleSheet, ActivityIndicator, ScrollView, Dimensions, Image, Button} from 'react-native';
import Loader from './Loader';
import DisplayPictureB64 from './displayPictureB64'
//-----------------------------
// Import SupabaseClient
//-----------------------------
import { supabaseClient } from '../../lib/initSupabase';
//-----------------------------
// End Import
//-----------------------------
//DisplayPictureUrl Component
const DisplayPictureUrl = (props) => {
	
	const [imgLoading, setImgLoading] = useState(false);
	const [avatarPic, setAvatarPic] = useState(null);
	
	useEffect(() => {
		console.log("PROPS : ");
		console.log(props);
		downloadImage(props["uri"]);
	}, []);
	
	async function downloadImage(path){
		try{
			setImgLoading(true);
			const { data, error } = await supabaseClient.storage.from('avatars').download(props["userIdFolder"]+'/'+path);
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
				setAvatarPic(base64Data);
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
		<DisplayPictureB64 base64={avatarPic} width={props["width"]} height={props["height"]} borderRadius={props["borderRadius"]}/>
	</View>
  );
}

/*

<Image source={{uri:avatarPic}} alt="Avatar" className="avatar image" 
			style={{
				width:props["width"],
				height:props["height"],
				borderRadius:props["borderRadius"]
			}}/>
			
			*/
// Export component -------
export default DisplayPictureUrl;