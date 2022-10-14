// src/screens/pictures/galleryScreen.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, {useEffect, useState} from 'react';
import {Button, Text, TouchableHighlight, View} from 'react-native';
//-----------------------------
// Import components
//-----------------------------
import  PicturePicker  from '../../components/picturesComponent/picturePicker';
//-----------------------------
// Import Context
//-----------------------------
import { useUserContext } from '../../context/userContext';
//-----------------------------
// Import supabaseClient
//-----------------------------
import { supabaseClient } from '../../../lib/initSupabase';


// gallery screen
const GalleryScreen = (props) => {
	
	const { user } = useUserContext();
	
	const [myPictures, setMyPictures] = useState(null);
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		LoadMyPicturesNames();
	}, []);
	
	function redirectToAddPicture(){
		props.navigation.navigate('AddPicture');
	}
	
	const LoadMyPicturesNames = async () => {
		setLoading(true);
		try{
			const { data: picturesName, error } = await supabaseClient.from('pictures').select('picture_name').eq('owner', user["id"])
//			LoadPictures(picturesName);
		}catch(error){
			
		}finally{
			setLoading(false);
		}
	}
	
	const LoadPictures = async (picturesNameTable) => {
		try{
			picturesNameTable.forEach((pictureName) => {
				console.log(pictureName["picture_name"]);
			const { data : picture, error: pictureError } = await supabaseClient.storage
					.from('pictures')
					.download(user["id"]+"/"+pictureName["picture_name"]);
					setMyPictures(picture);
			});
		}catch(error){
			
		}finally{
			
		}
	}
	
	return(
		<View>
			<View>
				<Text>Add a Picture</Text>
				<PicturePicker props={props}/>
			</View>
			<View>
				<Text>Gallery View</Text>
			</View>
		</View>		
	)
}

export default GalleryScreen;