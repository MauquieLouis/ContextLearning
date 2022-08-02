// src/screens/auth/forgotPasswordScreen.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, { useState, useEffect } from 'react';
import {Text, View, Image, TouchableHighlight} from 'react-native';
import {Button, Input} from 'react-native-elements';
import styles from '../../static/styles/authStyle/style';
//-----------------------------
// Import all things from supabase 
//-----------------------------
import { supabaseClient } from '../../../lib/initSupabase';
//-----------------------------
// Import icons and Toast
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faGlobe, faEnvelope, faImage, faTimes  } from '@fortawesome/free-solid-svg-icons';
//-----------------------------
// Import avatar upload
//-----------------------------
//-----------------------------
// End Import
//-----------------------------

//Forgot Password Screen
const ForgotPasswordScreen = (props) => {
	
	const [email, setEmail] = useState('');
		
	const handleSendMail = async type => {
		const { data, error } = await supabaseClient.auth.api.resetPasswordForEmail(email);
		
	}
		
  return (
    	<View style={[styles.container]}>
    		<View style={{flex:1,justifyContent: "center", alignItems: 'flex-end', paddingRight:20}}>
    			<TouchableHighlight onPress={() => {props.navigation.goBack()}} underlayColor={'none'}>
    				<FontAwesomeIcon icon={faTimes} color={'grey'} size={36} />
    			</TouchableHighlight>
    		</View>
    		<View style={[styles.top,{flex:12, marginTop:-80}]}>
    			<View style={(styles.imageView)}>
					<Image source={require('../../static/images/logo/Logo.png')} style={(styles.imageBrand)}/>
				</View>
				<Text style={[styles.boldText, styles.bigText, styles.centerText]}>I forgot my password</Text>
				<View style={[styles.verticallySpaced, styles.mTop20]}>
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
					<Button
						title="Send mail"
						onPress={() => handleSendMail()}
					/>
				</View>
    		</View>
		</View>
  );
}
// Export Screen -------
export default ForgotPasswordScreen;
// ================================== //
// ======== S T Y L E S ============= //
// ================================== //
