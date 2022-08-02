// src/screens/profileScreen.js
//-----------------------------
// Import all stranges modules from react / native / elements / style
//-----------------------------
import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, StyleSheet, ActivityIndicator, Alert, Image, TouchableHighlight } from 'react-native';
import {Button, Input} from 'react-native-elements';
import styles from '../../static/styles/authStyle/style';
//-----------------------------
// Import all things from supabase 
//-----------------------------
import { supabaseClient  } from '../../../lib/initSupabase';
//-----------------------------
// Import icons and Toast
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

export default function AuthScreen(props){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState('');
	
	const handleSignIn = async type => {
		//Sign in : redirect to profile if success
		try{
			const {error, user} = await supabaseClient.auth.signIn({email,password});
			console.log("Error : ",error);
			console.log("User : ", user);
//			props.navigation.navigate('Profile', {screen : 'seeProfile'}); 
			
		}catch(error){
			console.log("Error : ",error);
			
		}finally{
			console.log("Sign in out ...");
		}
	}
	
	const handleSignUp = async type => {
		//Sign up : redirect to newAccount.
		props.navigation.navigate('newAccount'); 
	}
	
	return(
		<View style={(styles.container)}>
			<View style={(styles.top)}>
				<View style={(styles.imageView)}>
					<Image source={require('../../static/images/logo/Logo.png')} style={(styles.imageBrand)}/>
				</View>
				<View style={(styles.verticallySpaced)}>
					<Input
						label="Email"
						leftIcon={<FontAwesomeIcon icon={faEnvelope} color={'grey'} size={24}/>}
						onChangeText={text => setEmail(text)}
						value={email}
						placeholder="email@adress.com"
						autoCapitalize={'none'}
					/>
				</View>
				<View style={(styles.verticallySpaced)}>
					<Input
						label="Password"
						leftIcon={<FontAwesomeIcon icon={faLock} color={'grey'} size={24}/>}
						onChangeText={text => setPassword(text)}
						value={password}
						secureTextEntry={true}
						placeholder="Password"
						autoCapitalize={'none'}
					/>
				</View>
				<View style={[styles.verticallySpaced, styles.mBot10, {flexDirection: 'row', justifyContent: 'flex-end'}]}>
					<Text onPress={() => {props.navigation.navigate('forgotPassword')}} style={(styles.signUpText)}>Forgot password ?</Text>
				</View>
				<View style={(styles.verticallySpaced)}>
					<Button
						title="Sign in"
						disabled={!!loading.length}
						loading={loading === 'LOGIN'}
						onPress={() => handleSignIn()}
					/>
				</View>
				
			</View>
			<View style={(styles.bottom)}>
				<Text style={(styles.signUpFullText)}>
					Don't have an account ? 
					<Text onPress={() => handleSignUp()} style={(styles.signUpText)}> Sign up</Text>.
				</Text>
			</View>
		</View>
	)
}

