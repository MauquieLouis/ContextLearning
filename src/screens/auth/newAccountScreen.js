// src/screens/auth/newAccountScreen.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, StyleSheet, ActivityIndicator, ScrollView, Dimensions, Image} from 'react-native';
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
// End Import
//-----------------------------
const { height } = Dimensions.get('window');

//Profile Screen
const ProfileScreen = (props) => {
	
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	
	const handleSignIn = async type =>{
		props.navigation.navigate('login'); 
	}
	
	const handleSignUp = async type => {
		try{
			const {error, user} = await supabaseClient.auth.signIn({email,password});
			console.log("Error : ",error);
			console.log("User : ", user);
			props.navigation.navigate('Profile'); 
			
		}catch(error){
			console.log("Error : ",error);
			
		}finally{
			console.log("Sign in out ...");
		}
	}
	
  return (
	<ScrollView contentContainerStyle={{ flexGrow:1}}>
    	<View style={[styles.container]}>
    		<View style={[styles.top]}>
	    		<View style={[styles.imageView, styles.mTop20]}>
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
						label="Username"
						leftIcon={<FontAwesomeIcon icon={faUser} color={'grey'} size={24}/>}
						onChangeText={text => setUsername(text)}
						value={username}
						placeholder="i.e : Jean-Michel Bourg-Palette93"
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
export default ProfileScreen;
