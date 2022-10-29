// src/components/picturesComponents/picturePicker.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, { useState, useEffect } from 'react';
import { View, Button, TouchableHighlight, Text } from 'react-native';
import Loader from '../../components/Loader';
//-----------------------------
// Import SupabaseClient
//-----------------------------
import { supabaseClient } from '../../../lib/initSupabase';
//-----------------------------
//	Import to upload pictures
//-----------------------------
import { launchImageLibrary } from 'react-native-image-picker';
import {decode } from 'base64-arraybuffer';
//-----------------------------
// Import icons
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
//-----------------------------
// End Import
//-----------------------------
//picturePicture Component
const PicturePicker = (props) => {
	
	const [imgLoading, setImgLoading] = useState(false);
	const [picture, setPicture] = useState(null);
	const [avatarUrl, setAvatarUrl] = useState(null);
	
	useEffect(() => {
		console.log("PROPS : ");
		console.log(props["props"]);
	}, []);
	
	function returnBase64FileExtAndFileName(fileAsset){
		var base64 = fileAsset.base64;
		var ext = fileAsset.fileName.split('.').pop();
		var name = fileAsset.fileName;
		return { base64,ext,name };
	}
	
	async function uploadAvatar(base64, ext, name){
		try{
			setImgLoading(true);
			console.log("In upload !!");
			if (!base64 || base64 === 0){
				throw new Error('You must select an image to upload.');
			}
			if(ext =='jpg'){
				ext = 'jpeg';
			}
			//Load the current user;
			const user = supabaseClient.auth.user();
			
			//upload the new picture
			let { error: uploadError } = await supabaseClient.storage
			.from('avatars')
			.upload(user.id+'/'+name, decode(base64),{contentType: 'image/'+ext});
			if(uploadError){
				console.log(uploadError);
				throw uploadError
			}
			console.log(": uploaded succed !");
		}catch(error){
			console.log(error);
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
		{/** Add a picture view */}
		<View style={{marginTop:10}}>
			<TouchableHighlight
				onPress={ async () => {
					try{
					const result = await launchImageLibrary({includeBase64:true, maxWidth:1000, maxHeight:1000});
					const { base64, ext, name } = returnBase64FileExtAndFileName(result.assets[0]);
					setPicture({ base64, ext, name });
					//Redirect to picture editor with the picture in props
					props["props"].navigation.navigate('EditPicture',{ base64, ext, name })
				}catch(error){
					console.log(error);
				}
				}}
				>
				<FontAwesomeIcon icon={faPlusSquare} size={46} color={"#25ADAD"}/>
			</TouchableHighlight>
		</View>
	</View>
  );
}

// Export component -------
export default PicturePicker;