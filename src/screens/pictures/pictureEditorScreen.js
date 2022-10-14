// src/screens/pictures/pictureEditorScreen.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, {useEffect, useState} from 'react';
import { Text, View, Button } from 'react-native';
//-----------------------------
// Import components
//-----------------------------
import DisplayPictureB64 from '../../components/pictureUtils/displayPictureB64';
import { decode } from 'base64-arraybuffer';

// pictureEditor screen
const PictureEditorScreen = (props) => {
	
	const [picture, setPicture] = useState(null);
	
	useEffect(() => {
		decodeBase64Data();
		console.log("Props in picture editor");
		console.log(props.route.params["ext"]);
	}, []);
	
	function decodeBase64Data(){
		var base64Data;
		var decodedData = decode(props.route.params["base64"]);
		console.log(decodedData);
		const fileReaderInstance = new FileReader();
		fileReaderInstance.readAsDataURL(decodedData);
		fileReaderInstance.onload = () => {
			base64Data = fileReaderInstance.result;
			setPicture(base64Data);
		}
		console.log(base64Data);
	}
	
	return( 
		<View>
			<Text>Edit a Picture</Text>
			<Text>AA</Text>
			<DisplayPictureB64 
				base64={props.route.params["base64"]}
				width={200}
				height={200} 
				boderRadius={0}
				ext={props.route.params["ext"]}
				/>
		</View>		 
	);
}

export default PictureEditorScreen;