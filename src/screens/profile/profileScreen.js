// src/screens/profile/profileScreen.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, ActivityIndicator, ScrollView, Image, Button, TouchableHighlight} from 'react-native';
import styles from '../../static/styles/profileStyle/profileStyle';
import gStyles from '../../static/styles/globalStyle/globalStyle';
import { useIsFocused } from '@react-navigation/native';
//-----------------------------
// Import components
//-----------------------------
import Loader from '../../components/Loader';
import DisplayPictureUrl from '../../components/displayPictureUrl';
import DisplayProfilePicture from '../../components/displayProfilePicture';
//-----------------------------
// Import all things from supabase 
//-----------------------------
import { supabaseClient } from '../../../lib/initSupabase';
//-----------------------------
// Import icons and Toast
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserEdit  } from '@fortawesome/free-solid-svg-icons';
//-----------------------------
// Import avatar upload
//-----------------------------
//-----------------------------
// Import Usercontext
//-----------------------------
import { useUserContext } from "../../context/userContext";
//-----------------------------
// End Import
//-----------------------------
//Profile Screen
const ProfileScreen = (props) => {
	
	const {profile, loading} = useUserContext();
	const [profileData, setProfileData] = useState(profile);
	const isFocused = useIsFocused();
	useEffect(() => {
		setProfileData(profile);
		console.log(profile);
	},[isFocused]);
	
	function userSignOut(){
		try{
			supabaseClient.auth.signOut();props.navigation.navigate('Map');
		}catch(error){
			
		}finally{
			
		}
	}
	
	function redirectToEditProfile(){
		console.log("Redirect To Edit Profile");
		console.log(props)
		props.navigation.navigate('editProfile')
	}

	if(loading){
		return <Loader/>;
	}
  return (
	<ScrollView contentContainerStyle={gStyles.contentContainerStyleScrollView}>
    	<View style={gStyles.container}>
    		{profile ? 
    		<>
    			{/* ---=== TOP SECTION ===--- */}
    			<View style={gStyles.rowContainer}>
	    			{/* ---=== picture section ===--- */}
    				<View style={[gStyles.mgLeft10, styles.flexPicture]}>
    					{profile["avatar_url"]? 
    					<DisplayProfilePicture width={70} 
			    			height={70} 
			    			borderRadius={50}/>
//			    		<DisplayPictureUrl 
//			    			uri={profileData["avatar_url"]} 
//			    			key={profileData["avatar_url"]} 
//			    			userIdFolder={profile['id']}
//			    			width={70} 
//			    			height={70} 
//			    			borderRadius={50}/>
    					: 
    					<Image source={require('../../static/images/user/defaultAvatar.png')} style={[{width:70,height:70,borderRadius:50}]}/>
    					}
    				</View>
	    			{/* ---=== end picture section ===--- */}
	    			{/* ---=== name, pseudo, edit profile section ===--- */}
    				<View style={[gStyles.mgRight10, styles.flexText]}>
    					<View style={[styles.columnContainer, styles.positionInfos]}>
							<View style={[ gStyles.rowContainer]}>
								<Text style={[gStyles.mgLeft20,gStyles.mgTop10,{fontSize:15,flex:1}]}>{profile["name"]}</Text>
								<TouchableHighlight 
									onPress={() => {redirectToEditProfile()}}
									underlayColor={'#ABABAB'} 
									style={[styles.touchableEditProfile,styles.flexWrap,{flex:1}]}>
									<FontAwesomeIcon icon={faUserEdit} color={'grey'} size={36}/>
								</TouchableHighlight>
							</View>
    						<View style={styles.flexWrap}>
								<Text style={styles.textInfo}>Welcome 
									<Text style={{fontWeight:'bold', fontSize:16}}> @{profile["username"]}</Text>
								</Text>
    						</View>
    					</View>
    				</View>
	    			{/* ---=== end name, pseudo, edit profile section ===--- */}
    			</View>
    			<View style={[gStyles.greyLine]}></View>
    			{/* ---=== END TOP SECTION ===--- */}
    			{/* ---=== BOTTOM SECTION ===--- */}
    			<View style={styles.columnContainer}>
	    			<View style={styles.columnContainer}>
	    				<Text>{profile["profile_desc"]}</Text>
	    			</View>
	    			<View style={styles.columnReverseContainer}>
						<Button className="button block" onPress={() => {userSignOut()}} title="Sign Out"/>
						<Text style={styles.textInfo}>Remeber To Remove this button in prod ...</Text>
	    			</View>
    			</View>
    			{/* ---=== END BOTTOM SECTION ===--- */}
			</>
    		:
    		<>
				<Text style={styles.textInfo}>Welcome Nobody, Please try to reload your App</Text>
				<Text style={styles.textInfo}>If it persist, please contact, us to support@company.com</Text>
			</>
    		}
		</View>
	</ScrollView>
  );
}
// Export Screen -------
export default ProfileScreen;
