// src/components/userSearchDisplay.js
import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, StyleSheet, ScrollView, Image, TouchableHighlight, KeyboardAvoidingView} from 'react-native';
//-----------------------------
// Import icons and Toast
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faGlobe, faEnvelope, faImage, faMagnifyingGlass  } from '@fortawesome/free-solid-svg-icons';
import {Button, Input} from 'react-native-elements';
//-----------------------------
// Import all things from supabase 
//-----------------------------
import { supabaseClient  } from '../../lib/initSupabase';

//Search Screen
const UserSearchDisplay = (props) => {
	const [avatarUrl, setAvatarUrl] = useState(null);
	const [loading, setLoading] = useState(false);
	
	
	useEffect(() => {
		if (props.profile.avatar_url) downloadImage(props.profile.avatar_url)
		return() => {setAvatarUrl()}
	}, [props.profile.avatar_url]);

	async function downloadImage(path){
		try{
			setLoading(true);
			const { data, error } = await supabaseClient.storage.from('avatars').download(path);
			if(error){
				console.log(error);
				throw error
			}
			var base64Data;
			const fileReaderInstance = new FileReader();
			fileReaderInstance.readAsDataURL(data);
			fileReaderInstance.onload = () => {
				base64Data = fileReaderInstance.result;
				setAvatarUrl(base64Data);
			}
			console.log('download Succeed !');
		} catch (error) {
			console.log('Error downloading image: ', error.message);
		}finally{
			setLoading(false);
		}
	}	
	return(
		<View style={styles.container}>
			<Image source={{uri:avatarUrl}} alt="Avatar" className="avatar image" style={styles.image}/>
			<Text style={styles.info}>{props.profile.username}</Text>		
		</View>
		);
}

export default UserSearchDisplay;

const styles = StyleSheet.create({
	container:{
		flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
		flex: 1,
		marginBottom:2,
	},
	image:{
		width:50,
 		height: 50,
		borderRadius:25,
	},
	info:{
		flex: 1,
		marginLeft: 15,
	    color: '#424242',
		fontWeight:'bold',
		fontSize:22
	},	
});