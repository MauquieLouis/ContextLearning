import React, { useState, useLayoutEffect } from 'react';
import {Text, View, TextInput, StyleSheet, FlatList, ActivityIndicator, Button, TouchableHighlight} from 'react-native';
//-----------------------------
// Import icons and Toast
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faGlobe, faEnvelope, faImage  } from '@fortawesome/free-solid-svg-icons';
//-----------------------------
// Import all things from supabase 
//-----------------------------
import { supabaseClient  } from '../../../lib/initSupabase';
//-----------------------------
// Import display User component
//-----------------------------
import UserSearchDisplay from '../../components/userSearchDisplay';

//Search Screen
const SearchScreen = (props) => {
	const [loading, setLoading] = useState(false);
	const [textSearch, setTextSearch] = useState('');
	const [usersToDisplay, setUsersToDisplay] = useState(null); // remplacer le useState(null) par useState(historique recherche)
	
	useLayoutEffect(() => {
		props.navigation.setOptions({
			headerRight:() => (
				<Button onPress={() => props.navigation.goBack()} title="back"/>
			)
		})
	},[props.navigation])
	
	async function onChangeSearchUser(text){
//		setLoading(true);
		console.log('Hey bitch ! : '+text);
		if(!text){console.log('nullTxt');setUsersToDisplay(null);setLoading(false);return;}
		try{
			let { data: profiles, error } = await supabaseClient
				.from('profiles')
			  	.select('id,username,avatar_url')
				.ilike('username', "%"+text+"%");
			console.log(profiles);
			setUsersToDisplay(profiles);
		}catch(error){
			console.log(error);	
		}finally{
			setLoading(false);
		}
	}
	
		function redirectTo(user){
//		props.navigation.setParams({})
		//Add in props a variable which indicate to which things redirect like messaging, profile, ...
		props.navigation.navigate('Messagings',{screen:'messaging',params:{userId:user.id}});
	}
	
	return(
		<View style={styles.container}>
			<View style={styles.searchView}>
				<TextInput 
					label="searchUser"
					placeholder="Search user..." 
					onChangeText={text => onChangeSearchUser(text)}
					style={styles.input}
					autoFocus
				/>
			</View>
			{loading ?
				<View>
					<ActivityIndicator size='large' color="#0000ff" style={styles.activityIndicator}/>		
				</View>
				 : 
			(
				<View style={styles.result}>
					<FlatList keyboardShouldPersistTaps='handled'
						data={usersToDisplay}
						renderItem={({item}) => (
							<TouchableHighlight onPress={() => redirectTo(item)} keyboardShouldPersistTaps={'handled'}>
								<UserSearchDisplay profile={item} navigation={props.navigation}/>
							</TouchableHighlight>
							)}>
					</FlatList>
				</View>
			)}
		</View>
	);
}

export default SearchScreen;

const styles = StyleSheet.create({
	container: {
    	marginTop: 24,
    	padding: 2,
	},
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
	},
	result:{
		marginTop:40,
	},
	activityIndicator:{
		marginTop:70,
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	}
});