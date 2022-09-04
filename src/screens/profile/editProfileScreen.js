// src/screens/profile/editProfileScreen.js
//-----------------------------
// Import all stranges modules from react / native / elements / styles
//-----------------------------
import React, { useState, useEffect } from 'react';
import {Text, View, ScrollView, Dimensions, Image, Button, Animated} from 'react-native';
import { Input } from 'react-native-elements';
import styles from '../../static/styles/profileStyle/editProfileStyle';
import gStyles from '../../static/styles/globalStyle/globalStyle';
//-----------------------------
// Import components
//-----------------------------
import Loader from '../../components/Loader';
import DisplayPictureUrl from '../../components/displayPictureUrl';
import UploadPicture from '../../components/uploadPicture';
//-----------------------------
// Import all things from supabase 
//-----------------------------
import { supabaseClient } from '../../../lib/initSupabase';
//-----------------------------
// Import icons and Toast
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
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

//Edit Profile Screen
const EditProfileScreen = (props) => {
	
	const {profile, loading} = useUserContext();
	
	const [username, setUsername] = useState(profile["username"]);
	const [name, setName] = useState(profile["name"]);
	const [avatarUrl, setAvatarUrl] = useState(profile["avatar_url"]);
	const [profileDesc, setProfileDesc] = useState(profile["profile_desc"]);
	
	useEffect(() => {
	}, []);
	
	function userSignOut(){
		try{
			supabaseClient.auth.signOut();props.navigation.navigate('Map');
		}catch(error){
			
		}finally{
			
		}
	}

	if(loading){
		return <Loader/>;
	}
  return (
	<ScrollView contentContainerStyle={gStyles.contentContainerStyleScrollView}>
		<View style={[gStyles.columContainer]}>
			<View style={[gStyles.mgBottom20, gStyles.mgTop20]}>
				<Text style={[gStyles.title]}>Edit your profile</Text>
			</View>
			<View style={[gStyles.greyLine, gStyles.mgBottom20]}></View>
			<View style={[gStyles.paddingRight20, gStyles.paddingLeft20, {flex:1}]}>
				
				<Input
					label="Username"
					leftIcon={<FontAwesomeIcon icon={faUserCircle} color={'grey'} size={24}/>}
		      		onChangeText={text => setUsername(text)}
		      		value={username}
		      		placeholder="Enter a username"
		      		autoCapitalize={'none'}
		      		maxLength={127}
		      	/>
		      	<Input
					label="Name"
					leftIcon={<FontAwesomeIcon icon={faUser} color={'grey'} size={24}/>}
		      		onChangeText={text => setName(text)}
		      		value={name}
		      		placeholder="Enter your name"
		      		autoCapitalize={'none'}
		      		maxLength={127}
		      		/>
	      		<Input
					label="Description"
					leftIcon={<FontAwesomeIcon icon={faUser} color={'grey'} size={24}/>}
		      		onChangeText={text => setProfileDesc(text)}
		      		value={profileDesc}
		      		placeholder="Enter a description about you"
		      		autoCapitalize={'none'}
		      		multiline={true}
		      		maxLength={1024}
		      		/>
		      	<Button  title={"Save Changes"}/>
	      		<View style={[gStyles.rowContainer,gStyles.alignItemsCenter, gStyles.mgBottom20, gStyles.mgTop20]}>
					<Text style={[gStyles.mgRight20]}>Profile picture : </Text>
	      			{avatarUrl? 
			    		<DisplayPictureUrl 
			    			uri={avatarUrl} 
			    			key={avatarUrl}
			    			userIdFolder={profile['id']} 
			    			width={50} 
			    			height={50} 
			    			borderRadius={50}/>
    					:
						<Image source={require('../../static/images/user/defaultAvatar.png')} style={[{width:50,height:50,borderRadius:50}]}/>
    					}
	      			<View style={[{position:"absolute", right:0, bottom:8}]}>
			      		<UploadPicture buttonTitle={"Change picture"} urlSetter={setAvatarUrl} avatarUrl={avatarUrl}/>
	      			</View>
				</View>
			</View>
		</View>
    	<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Button className="button block" onPress={() => {userSignOut()}} title="Sign Out"/>
		</View>
	</ScrollView>
  );
}
// Export Screen -------
export default EditProfileScreen;
