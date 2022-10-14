// src/components/pictureUtils/displayPictureB64.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, StyleSheet, ActivityIndicator, ScrollView, Dimensions, Image, Button, Animated} from 'react-native';

//-----------------------------
// Import SupabaseClient
//-----------------------------
import { supabaseClient } from '../../../lib/initSupabase';
//-----------------------------
// End Import
//-----------------------------

/**
	*************************************************************************
	***- - - - - = = = = =    P A R A M E T E R S    = = = = = = - - - - -***
	*************************************************************************
	
	1) base64 : picture in base64 format 
		
	2) width: width of the picture to display on screen
	
	3) height: height of the picture to display on screen
	
	4) borderRadius : 0 if square, 50 for circle or anything you want to round border

	*************************************************************************
	**- - - - - = = = = =  E N D   P A R A M E T E R S  = = = = = - - - - -**
	*************************************************************************
	**/

//DisplayPictureB64 Component
const PictureDisplayB64 = (props) => {
	
	useEffect(() => {
		console.log("Props in DisplayPictureB64");
		console.log(props["width"])
	}, []);
	
	
	
  return ( 
	<View>
{/**		<Image source={{uri:'data:image/jpg;base64,'+props["base64"]}} alt="picture" className="image"  */}
		<Image source={{uri:'data:image/'+props["ext"]+";base64,"+props["base64"]}} alt="picture" className="image" 
			style={{
				width:props["width"],
				height:props["height"],
				borderRadius:props["borderRadius"]
			}}/>
	</View>
  );
}

// Export component -------
export default PictureDisplayB64;