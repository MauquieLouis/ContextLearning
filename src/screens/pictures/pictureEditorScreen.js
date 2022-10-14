// src/screens/pictures/pictureEditorScreen.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, {useEffect, useState} from 'react';
import { Text, View, Button, TouchableHighlight } from 'react-native';
//-----------------------------
// Import components
//-----------------------------
import PictureDisplayB64 from '../../components/picturesComponent/pictureDisplayB64';
import PictureUpload  from '../../components/picturesComponent/pictureUpload';
//-----------------------------
// Import styles
//-----------------------------
import styles from '../../static/styles/pictures/pictureEditorStyle';



// pictureEditor screen
const PictureEditorScreen = (props) => {
	
	const [effect, setEffect] = useState(null);
	
	useEffect(() => {
		
	}, []);
	
	return( 
		<View style={styles.mainContainer}>
			<View style={styles.titleView}>
				<Text style={styles.textStyle}>Edit a Picture</Text>
			</View>
			<View style={styles.imageView}>
				<PictureDisplayB64 
					base64={props.route.params["base64"]}
					width={300}
					height={300} 
					borderRadius={10}
					ext={props.route.params["ext"]}
					effect={effect}
					/>
			</View>
			<View style={styles.horizontalView}>
				<TouchableHighlight
					onPress={() => {
						alert("Effect 1");
					}}
					style={styles.elemInHorizontalView}
				>
					<Text>Effect 1</Text>
				</TouchableHighlight>
				<TouchableHighlight
					onPress={() => {
						alert("Effect 2");
					}}
					style={styles.elemInHorizontalView}
				>
					<Text>Effect 2</Text>
				</TouchableHighlight>
				<TouchableHighlight
					onPress={() => {
						alert("Effect 3");
					}}
					style={styles.elemInHorizontalView}
				>
					<Text>Effect 3</Text>
				</TouchableHighlight>
			</View>
			<View style={styles.titleView}>
				<Text style={styles.textStyle}>Save this picture ?</Text>
			</View>
			
				<PictureUpload 
					propsP={props}
					name={props.route.params["name"]} 
					image={props.route.params["base64"]} 
					ext={props.route.params["ext"]}/>
		</View>		 
	);
}

export default PictureEditorScreen;