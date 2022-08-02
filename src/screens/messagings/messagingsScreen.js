import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, StyleSheet, ScrollView, Pressable} from 'react-native';
//-----------------------------
// Import icons and Toast
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faGlobe, faEnvelope, faImage, faMagnifyingGlass  } from '@fortawesome/free-solid-svg-icons';
//import { faMagnifyingGlass  } from '@fortawesome/free-regular-svg-icons';
//import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' //

import {Button, Input} from 'react-native-elements';


//Messagings Screen
const MessagingsScreen = (props) => {
	const [textSearch, setTextSearch] = useState('');
	function onPressFunction(text){
		console.log('Hey bitch ! : ');
		props.navigation.navigate('Messagings',{screen :'search'});
	}
	
	return(
		<ScrollView>
			<View>
				<Pressable onPress={onPressFunction}>
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
				</Pressable>
				<View style={styles.underSearchLine}></View>
				<Text>Messagings Screen</Text>
				<Text>Display all messaging here</Text>
			</View>
		</ScrollView>
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
