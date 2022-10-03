// src/components/UploadPicture.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, ActivityIndicator, ScrollView, Dimensions, Image, Button } from 'react-native';
import Loader from '../components/Loader';
//-----------------------------
// Import SupabaseClient
//-----------------------------
import { supabaseClient } from '../../lib/initSupabase';
//-----------------------------
//	Import to upload pictures
//-----------------------------
import { launchImageLibrary } from 'react-native-image-picker';
import {decode } from 'base64-arraybuffer';
//-----------------------------
// End Import
//-----------------------------
//UploadPicture Component
const UploadPicture = (props) => {
	
	const [imgLoading, setImgLoading] = useState(false);
	const [avatarUrl, setAvatarUrl] = useState(null);
	
	useEffect(() => {
		console.log("PROPS : ")
		console.log(props);
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
			//load the old picture name
			let { data: oldPic , error2 } = await supabaseClient.from('profiles').select("avatar_url").eq("id",user.id);
			if(oldPic[0]["avatar_url"] != ""){
				//if it exist : delete it
				const { data } = await supabaseClient.storage.from('avatars').remove([user.id+'/'+oldPic[0]["avatar_url"]]);
			}
			if(error2){
				console.log("ERROR in upLoadPicte, can't load avatar_url:",error);
			}
			//Change the picture name in profile
			let {error} = await supabaseClient.from('profiles').upsert({id: user.id, avatar_url:name}, {returning:'minimal'});
			props["urlSetter"](name)
			
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
		<View style={{marginTop:10}}>
			<Button title={props["buttonTitle"]}
//				style={[{color:props["color"]}]}
				onPress={async () => {
				try{
					const result = await launchImageLibrary({includeBase64:true, maxWidth:1000, maxHeight:1000});
					const {base64, ext, name} = returnBase64FileExtAndFileName(result.assets[0]);
					uploadAvatar(base64, ext, name);
				}catch(error){
					console.log(error);
				}
			}}/>
		</View>
	</View>
  );
}

// Export component -------
export default UploadPicture;