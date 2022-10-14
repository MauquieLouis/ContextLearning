// src/screens/pictures/galleryScreen.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, {useEffect, useState} from 'react';
import {Button, Text, TouchableHighlight, View} from 'react-native';

import  PicturePicker  from '../../components/picturesComponent/picturePicker';

// gallery screen
const GalleryScreen = (props) => {
	
	
	function redirectToAddPicture(){
		props.navigation.navigate('AddPicture');
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