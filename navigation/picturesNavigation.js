// navigation/profileNavigations.js
//-----------------------------
// Import all react bullshit and navigation
//-----------------------------
import React, {useEffect, useState} from 'react';
import { TouchableHighlight, Alert} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import gStyles from '../src/static/styles/globalStyle/globalStyle';
import themeColors from '../src/static/styles/globalStyle/themeColor';
//-----------------------------
// Import all screen
//-----------------------------
import AddPictureScreen from '../src/screens/pictures/addPictureScreen';
import PictureEditorScreen from '../src/screens/pictures/pictureEditorScreen';
import GalleryScreen from '../src/screens/pictures/galleryScreen';
//-----------------------------
// 
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
//-----------------------------

//-----------------------------
import { supabaseClient } from '../lib/initSupabase';

import { useUserContext } from "../src/context/userContext";

//Create a navigator
const PicturesNavigator = createNativeStackNavigator();

// pictures Navigation
const PicturesNavigation = () => {

	const { profile, darkTheme } = useUserContext();
	
	const [dark_theme, setDarkTheme] = useState(profile["dark_mode"]);
	
	useEffect(() => {
	}, [profile, darkTheme]);

	function userSignOut(){
		try{
			supabaseClient.auth.signOut();props.navigation.navigate('Map');
		}catch(error){
			
		}finally{
			
		}
	}
	
	return(
		<PicturesNavigator.Navigator screenOptions={{
			headerShown: true,
			headerStyle:(darkTheme ? ({backgroundColor:themeColors.darkBackgroundTab}): ({backgroundColor:themeColors.LightBackgroundTab})),
			headerTintColor:(darkTheme ? (themeColors.darkTextColor):(themeColors.lightTextColor))
			}}>
			{/** Gallery Screen */}
			<PicturesNavigator.Screen name="Gallery" component={GalleryScreen}
				options={{
					headerTitle: "My Gallery"
				}}/>
			{/** Add Picture Screen */}
			<PicturesNavigator.Screen name="AddPicture" component={AddPictureScreen} 
				options={{
		          headerTitle: "Add a picture to my gallery",
	        	}}
	        	/>
			{/** Edit Picture Screen */}
			<PicturesNavigator.Screen name="EditPicture" component={PictureEditorScreen} 
				options={{
		          headerTitle: "Edit a Picture",
	        	}}
	        	/>
		</PicturesNavigator.Navigator>
	);
	
}

export default PicturesNavigation;