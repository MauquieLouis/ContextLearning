import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, StyleSheet, FlatList, TouchableHighlight} from 'react-native';
//-----------------------------
// Import icons and Toast
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {  faMagnifyingGlass  } from '@fortawesome/free-solid-svg-icons';

import { useUserContext } from "../../context/userContext";
import { useMessagingContext } from "../../context/messagingContext";

import Loader from '../../components/Loader';

import { supabaseClient } from '../../../lib/initSupabase';

import DisplayPictureUrl from '../../components/displayPictureUrl';


//Messagings Screen
const MessagingsScreen = (props) => {
	
	const { messagingsToListen } = useMessagingContext();
	
	const [loading, setLoading] = useState(false);
	const [messagings, setMessagings] = useState(null);
	
	useEffect(() => {
		GetAllMessagings();
	}, []); 
	
	
	const GetAllMessagings = async () => {
		setLoading(true);
		try{
			//Get all messagings that we are listening to ...
			let { data: messagingsGet, error } = await supabaseClient
				.from("messaging")
				.select("*")
				.in("id",messagingsToListen)
				.then((messagingsGet) => {
//					console.log(messagingsGet)
//					OrderByDate(messagingsGet["body"]);
				});
			
				
		}catch(error){
			console.log("Error in messagingsScreen.js in GetAllMessagings() function");
			console.log(error);
			
		}finally{
			setLoading(false);
		}
	};

	function OrderByDate(messagingsTable){
		console.log(messagingsTable);
		for(var i = 0; i<messagingsTable.length-1; i++){
			for(var j= i; j<messagingsTable.length-1; j++){
				if(messagingsTable[j]["last_message"] < messagingsTable[j+1]["last_message"]){
					var oldSave = messagingsTable[j];
					messagingsTable[j+1] = messagingsTable[j];
					messagingsTable[j] = oldSave;
				}				
			}
		}
		console.log(messagingsTable);
	}

	//Redirect to search component... ->
	function onPressFunction(){
		props.navigation.navigate('Messagings',{screen :'search'});
	}
	
	return(
		<View style={{marginTop:15}}>
			<View>
				<TouchableHighlight onPress={onPressFunction} underlayColor={'transparent'} style={{height:40}}>
					<View style={styles.searchView}>
						<FontAwesomeIcon icon={faMagnifyingGlass} color={'grey'} size={24} style={styles.searchIcon}/>
						<TextInput 
							label="searchUser"
							placeholder="Search user..." 
							style={styles.input}
							editable={false}
							selectTextOnFocus={false}
						/>
					</View>
				</TouchableHighlight>
				<View style={styles.underSearchLine,{marginTop:30}}></View>
				<View>
				{loading ? 
					<Loader/>
				:
					<FlatList
//				        data={profiles}
//				        extraData={profiles}
//				        renderItem={renderItem}
				      />
				}
				</View>
			</View>
		</View>
	);
}
export default MessagingsScreen;

const styles = StyleSheet.create({
	input: {
		flex: 1,
		height: 40,
		margin: 12,
		borderBottomWidth: 1,
		borderBottomColor:'#D0D0D0',
	    paddingTop: 10,
	    paddingRight: 10,
	    paddingBottom: 10,
	    paddingLeft: 0,
	    color: '#424242',
	},
	searchView:{
		paddingLeft:8,
		flex: 1,
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
		
	},
	searchIcon:{
		padding:10,
	},
	underSearchLine:{
		borderTopWidth:1,
		marginLeft:6,
		marginRight:6,
		marginBottom:10,
		borderTopColor:'#CECECE'
	}
});
