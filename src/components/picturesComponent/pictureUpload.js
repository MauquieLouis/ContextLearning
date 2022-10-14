// src/components/picturesComponent/pictureUpload.js
//-----------------------------
// Import all stranges modules from react / native / elements / navigation
//-----------------------------
import React, {useEffect, useState} from 'react';
import { Text, View, Button, TouchableHighlight, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
//-----------------------------
// Import Component
//-----------------------------
import Loader from '../Loader';
//-----------------------------
// Import supabaseClient
//-----------------------------
import { supabaseClient } from '../../../lib/initSupabase';
//-----------------------------
// Import context
//-----------------------------
import { useUserContext } from '../../context/userContext';
//-----------------------------
// Import icons
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
//-----------------------------
// Import styles
//-----------------------------
import styles from '../../static/styles/pictures/pictureEditorStyle';
//-----------------------------
// Other Imports
//-----------------------------
import { decode } from 'base64-arraybuffer';


const PictureUpload = (props) => {

	const { user } = useUserContext();
	
	const [loading, setLoading] = useState(null);
	
	useEffect(() => {
		console.log("PROPS : ");
		console.log(props);
	}, []);
	
	const uploadPicture = async( ) => {
		console.log("In upload");
		try{
			setLoading(true);	
			const { data, error } = await supabaseClient.storage
				.from('pictures')
				.upload(user["id"]+'/'+props["name"], decode(props["image"]), {contentType: 'image/'+props["ext"]});
				if(error){
					console.log("error upload : ")
					console.log(error)
				}else
				{
					console.log("data : ")
					console.info(data);
				}
			const pictureDbToInsert = {
				owner : user["id"],
				picture_name : props["name"],
				rank : 0,
				effect : null,
			};
			const { data: pictureDB, error: errorDB} = await supabaseClient
				.from('pictures')
				.insert(pictureDbToInsert);
			if(errorDB){
				console.log("Error in insert picture in db : ");
				console.log(errorDB);
			}else{
				console.log("Data in insert DB : ");
				console.log(pictureDB);
			}
		}catch(error){
			console.log("Error in PictureUpload in PictureUpload.js");
			console.log(error);
		}finally{
			setLoading(false);
		}
	}
	
	function ConfirmDeletingPicture(){
		props["propsP"].navigation.dispatch(StackActions.popToTop());
	}
	
	 return(
		<>
			{loading ? 
				<Loader/>
			:
			<View style={styles.horizontalView}>
				<View style={styles.elemInHorizontalView}>
					<TouchableHighlight
						onPress={() => {
							//Let the alert to avoir missclick for deleting ....
							Alert.alert(
									"Abort",
          							"Do you want to forget this picture ?",
          							[{
									text:"No",
          							onPress: () => {},
          							},{
									text:"Yes",
									onPress: () => {ConfirmDeletingPicture()},
									}]
									)
						}}
						>
						<FontAwesomeIcon icon={faTimesCircle} size={46} color={"#DE3939"}/>
					</TouchableHighlight>
				</View>
				<View style={styles.elemInHorizontalView}>
					<TouchableHighlight
						onPress={() => {
							uploadPicture();
						}}
					>
						<FontAwesomeIcon icon={faCheckCircle} size={46} color={"#25ADAD"}/>
					</TouchableHighlight>
				</View>
			</View>
			}
		</>
		)
}

export default PictureUpload;