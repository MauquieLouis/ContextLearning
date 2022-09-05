// src/screens/auth/newAccountScreen.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, StyleSheet, ActivityIndicator, ScrollView, Dimensions, Image, Alert} from 'react-native';
import {Button, Input} from 'react-native-elements';
//-----------------------------
// Import all things from supabase 
//-----------------------------
import { supabaseClient } from '../../../lib/initSupabase';
//-----------------------------
// Import icons and Toast
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faGlobe, faEnvelope, faImage, faLock  } from '@fortawesome/free-solid-svg-icons';
import styles from '../../static/styles/authStyle/style';
//-----------------------------
// Import avatar upload
//-----------------------------
//-----------------------------

//-----------------------------
import { useToast } from "react-native-toast-notifications";
//-----------------------------
// End Import
//-----------------------------

//Profile Screen
const NewAccountScreen = (props) => {
	
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [loading, setLoading] = useState(false);
	const toast = useToast();
	
	const handleSignIn = async type =>{
		props.navigation.navigate('login'); 
	}
	
	const handleSignUp = async () => {
		console.log("SIGN UP IN !!")
		try{
			if(password != password2){
				Alert.alert(
					"Password not matching",
					"password not matching try again"
					,[{
						text:"OK",
						onPress: () => {},
						style:{}
				}]);
				return;
			}
			//Check if username is already in use in profile.
//			let { data: profiles, error } = await supabase.from 
			const {error, user} = await supabaseClient.auth.signUp({email:email,password:password},
				{
					data:{
						username:username,
						name:name
					}
				}).then((res) => {
				console.log("RES !!")
				console.log(res);
			});
			console.log("Error : ",error);
			console.log("User : ", user);
			
		}catch(error){
			console.log("Error : ",error);
			
		}finally{
			toast.show("Before navigate successfully", {
			  type: "normal",
			  placement: "bottom",
			  duration: 4000,
			  offset: 30,
			  animationType: "slide-in",
			});
			props.navigation.navigate('login'); 
			toast.show("To log in confirm your email, Maybe later it can be better to redirect to another page with some info to tell to confirm the mail sent to the adress lou********@gmail.com", {
			  type: "normal",
			  placement: "bottom",
			  duration: 10000,
			  offset: 30,
			  animationType: "slide-in",
			});
			console.log("Sign in out ...");
		}
	}
	
//	async function createProfile(id){
//		const { data, errorProfile } = await supabaseClient.from('profiles').insert([{id:id,username:username,name:name}]);
//			if(errorProfile){
//				console.log("ERROR");
//				console.log(errorProfile);
//			}
//	}
	
  return (
	<ScrollView contentContainerStyle={{ flexGrow:1}}>
    	<View style={[styles.container]}>
    		<View style={[styles.top]}>
	    		<View style={[styles.imageView, styles.mTop10]}>
					<Image source={require('../../static/images/logo/Logo.png')} style={(styles.imageBrand)}/>
					<Text style={[styles.boldText, styles.bigText]}>Sign up to meet people.</Text>
					<View style={[styles.greyLine]}></View> 
				</View>
				<View>
					<Input
						label="Email"
						leftIcon={<FontAwesomeIcon icon={faEnvelope} color={'grey'} size={24}/>}
						onChangeText={text => setEmail(text)}
						value={email}
						placeholder="email@adress.com"
						autoCapitalize={'none'}
					/>
					<Input
						label="@Username"
						leftIcon={<FontAwesomeIcon icon={faUser} color={'grey'} size={24}/>}
						onChangeText={text => setUsername(text)}
						value={username}
						placeholder="i.e : Jean-Michel Bourg-Palette93"
					/>
					<Input
						label="Name"
						leftIcon={<FontAwesomeIcon icon={faUser} color={'grey'} size={24}/>}
						onChangeText={text => setName(text)}
						value={name}
						placeholder="i.e : Jean Jean"
					/>
					<Input
						label="Password"
						leftIcon={<FontAwesomeIcon icon={faLock} color={'grey'} size={24}/>}
						onChangeText={text => setPassword(text)}
						value={password}
						secureTextEntry={true}
						placeholder="Password"
						autoCapitalize={'none'}
					/>	
					<Input
						label="Enter password again"
						leftIcon={<FontAwesomeIcon icon={faLock} color={'grey'} size={24}/>}
						onChangeText={text => setPassword2(text)}
						value={password2}
						secureTextEntry={true}
						placeholder="Enter password again"
						autoCapitalize={'none'}
					/>		
					<Button
						title="Sign up"
						onPress={() => handleSignUp()}
					/>
				</View>
			</View>
			<View style={[styles.bottom]}>
				<Text style={(styles.signUpFullText)}>
					Already have an account ? 
					<Text onPress={() => handleSignIn()} style={(styles.signUpText)}> Sign in</Text>.
				</Text>
			</View>
		</View>
	</ScrollView>
  );
}
// Export Screen -------
export default NewAccountScreen;
