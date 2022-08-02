// src/screens/profileScreen.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, StyleSheet, ActivityIndicator, ScrollView, Dimensions, Image, Button} from 'react-native';
//-----------------------------
// Import all things from supabase 
//-----------------------------
import { supabaseClient } from '../../../lib/initSupabase';
//-----------------------------
// Import icons and Toast
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faGlobe, faEnvelope, faImage  } from '@fortawesome/free-solid-svg-icons';
//-----------------------------
// Import avatar upload
//-----------------------------
//-----------------------------
// End Import
//-----------------------------
const { height } = Dimensions.get('window');
//Profile Screen
const ProfileScreen = (props) => {
	
	function userSignOut(){
		try{
			supabaseClient.auth.signOut();props.navigation.navigate('Map');
		}catch(error){
		}finally{
		}
	}
	
  return (
	<ScrollView>
    	<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Salut</Text>
			<Button className="button block" onPress={() => {userSignOut()}} title="Sign Out"/>
		</View>
	</ScrollView>
  );
}
// Export Screen -------
export default ProfileScreen;
// ================================== //
// ======== S T Y L E S ============= //
// ================================== //
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf:'stretch',
  },
  mt20: {
    marginTop: 20,
  },
loading_container:{
//    position:"absolute",
//    left:50,
//    right:0,
//    top:100,
//    bottom:0,
//    alignItems:'center',
//    justifyContent:'center',
  },
activityIndicator:{
	marginTop:height*0.5,
	flex:1,
	justifyContent:'center',
	alignItems:'center',
	}
});