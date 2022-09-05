// navigation/profileNavigations.js
//-----------------------------
// Import all react bullshit and navigation
//-----------------------------
import * as React from 'react';
import {Button, Text, TouchableHighlight, Alert} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import gStyles from '../src/static/styles/globalStyle/globalStyle';
//-----------------------------
// Import all screen
//-----------------------------
import ProfileScreen from '../src/screens/profile/profileScreen';
import EditProfileScreen from '../src/screens/profile/editProfileScreen';
//-----------------------------
// 
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
//-----------------------------

//-----------------------------
import { supabaseClient } from '../lib/initSupabase';

//Create a navigator
const ProfileNavigator = createNativeStackNavigator();

// profile Navigation
const ProfileNavigation = () => {

	function userSignOut(){
		try{
			supabaseClient.auth.signOut();props.navigation.navigate('Map');
		}catch(error){
			
		}finally{
			
		}
	}
	
	return(
		<ProfileNavigator.Navigator screenOptions={{headerShown: true}}>
			{/** profile Screen */}
			<ProfileNavigator.Screen name="seeProfile" component={ProfileScreen}/>
				{/** edit profile Screen */}
			<ProfileNavigator.Screen name="editProfile" component={EditProfileScreen} 
				options={{
		          headerTitle: (props) => <Text>Back To Profile</Text>,
		          headerRight: () => (
		            <TouchableHighlight
		              onPress={() => Alert.alert(
										"Log out",
              							"Do you want to log out ?",
              							[{
										text:"No",
              							onPress: () => {},
              							style:{}
              							},{
										text:"Yes",
										onPress: () => {userSignOut()},
										style:{}
										}]
              							)}//alert('Do you want to log out ?')}
		              title="Info"
		              color="#ABABAB"
		              underlayColor={'#ABABAB'} 
		              style={gStyles.touchableHighlightBck}
		            >
		            	<FontAwesomeIcon icon={faPowerOff} color={'grey'} size={24}/>
		            </TouchableHighlight>
		          ),
        	}}
        	/>
			{/** New Account Screen */}
			{/**<ProfileNavigator.Screen name="avatar" component={Avatar}/> */}
		</ProfileNavigator.Navigator>
	);
	
}

export default ProfileNavigation;