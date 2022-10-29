// src/screens/pictures/galleryScreen.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, {useEffect, useState} from 'react';
import {Button, Text, TouchableHighlight, View, Dimensions, FlatList } from 'react-native';
//-----------------------------
// Import components
//-----------------------------
import  PicturePicker  from '../../components/picturesComponent/picturePicker';
import  PictureDisplay from '../../components/picturesComponent/pictureDisplay';
//-----------------------------
// Import Context
//-----------------------------
import { useUserContext } from '../../context/userContext';
//-----------------------------
// Import supabaseClient
//-----------------------------
import { supabaseClient } from '../../../lib/initSupabase';
//-----------------------------
// Import styles
//-----------------------------
import styles from '../../static/styles/pictures/galleryStyle';
//-----------------------------
// Import NativeBase
//-----------------------------
import { Box } from "native-base";

//Remember to explain the process


// gallery screen
const GalleryScreen = (props) => {
	
	const { user } = useUserContext();
	
	const [picturesToDisplay, setPictureToDisplay] = useState(null);
	const [loading, setLoading] = useState(false);
	const [picturesLines, setPicturesLines] = useState(null);
	
	useEffect(() => {
		LoadMyPictures();
	}, []);
	
	useEffect(() => {
		if(picturesToDisplay){
			MakeRowOf3Picture(picturesToDisplay); 
		}
	}, [picturesToDisplay])
	
		
	const LoadMyPictures = async () => {
		setLoading(true);
		try{
			let pictureTable = [];
			const { data, error } = await supabaseClient.storage
				.from('pictures')
				.list(user["id"], {limit: 100, offset: 0, sortBy:{column:'created_at', order:'desc', search: 'join'}});
			if(error){
				console.log("Error in LoadMyPictures in galleryScreen.js (1) : ");
				console.log(error)
			}	
			for (let elem in data){
				//When we make a request to get all pictures from a user we got a row which is note a picture, so don't need to display it'
				if(data[elem]["metadata"]["mimetype"] != "application/octet-stream"){
					const { data : picture, error: pictureError } = await supabaseClient.storage
						.from('pictures')
						.download(user["id"]+"/"+data[elem]["name"]);
					var pictureToInsert = {
						pictureName: data[elem]["name"],
						pictureBlob: picture
					};
					pictureTable.push(pictureToInsert);
					if(pictureError){
						console.log("Error in LoadMyPictures in galleryScreen.js (2) : ");
						console.log(error);
					}
				}
			}
			setPictureToDisplay(pictureTable.reverse());

		}catch(error){
			console.log("Error in LoadMyPicture in galleryScreen.js");
			console.log(error);
		}finally{
			setLoading(false);
		}
	}
	
	function MakeRowOf3Picture(){
		var pictureLinesFullTable = [];
		var tableLine = [];
		var i;
		for(i = 1; i<picturesToDisplay.length+1;i++){
			tableLine.push(picturesToDisplay[i-1]);
			if(i%3 == 0){
				console.log("i == "+i);
				pictureLinesFullTable.push(tableLine);
				tableLine = [];
			}
		}
		if(pictureLinesFullTable.length != picturesToDisplay.length){
			pictureLinesFullTable.push(tableLine);
		}
		console.log(pictureLinesFullTable)
		setPicturesLines(pictureLinesFullTable);
	}
	
	const LineToRender= ({item}) => {
		console.log("Item :");
		console.log(item);
		//Treat the item.length image (3 normaly, or less for the last line)
		var render = []
		for(var i =0; i<item.length;i++){
			render.push(
				<PictureDisplay 
					key={item[i]["pictureName"]}
					width={33}
					height={33} 
					borderRadius={50}
					picture={item[i]["pictureBlob"]}
					/>
				)
		}
		return(
			<View style={styles.horizontalView}>
				{render}
			</View>
		);
	}
	
	return(
		
		<View style={styles.mainContainer}>
			<Box>Hello World !</Box>
			<View>
				<Text>Add a Picture</Text>
				<PicturePicker props={props}/>
			</View>
			<View>
				<Text>Gallery View</Text>
				<View >
					<FlatList 
						data={picturesLines}
						renderItem={LineToRender}
						extraData={picturesToDisplay}
					/> 
				</View>
			</View>
		</View>		
	)
}

export default GalleryScreen;