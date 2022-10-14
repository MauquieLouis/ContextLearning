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
import DisplayPictureUrl from '../../components/pictureUtils/displayPictureUrl';
import UploadPicture from '../../components/pictureUtils/uploadPicture';
import DisplayProfilePicture from '../../components/pictureUtils/displayProfilePicture';
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
// Import Bouncy CheckBox
//-----------------------------
import BouncyCheckbox from "react-native-bouncy-checkbox";
//-----------------------------
// Import Usercontext
//-----------------------------
import { useUserContext } from "../../context/userContext";
//-----------------------------
// End Import
//-----------------------------

//Edit Profile Screen
const EditProfileScreen = (props) => {
	
	const {profile, loading, darkTheme} = useUserContext();
	
	const [username, setUsername] = useState(profile["username"]);
	const [name, setName] = useState(profile["name"]);
	const [avatarUrl, setAvatarUrl] = useState(profile["avatar_url"]);
	const [profileDesc, setProfileDesc] = useState(profile["profile_desc"]);
	const [darkModeCheck, setDarkModeCheck] = useState(profile["dark_mode"]);
	const [loadingCheckBox, setLoadingCheckBox] = useState(false);
	const [loadingSaveBtn, setLoadingSaveBtn] = useState(false);
	const [dark_theme, setDarkTheme] = useState(darkTheme);
	
	useEffect(() => {
		console.log("USE EFFECT EDIT Profile Screen ! :")
		console.log(darkTheme);
	}, [darkTheme]);
	
	function userSignOut(){
		try{
			supabaseClient.auth.signOut();props.navigation.navigate('Map');
		}catch(error){
			
		}finally{
			
		}
	}
	
	async function setDarkMode(darkMode){
		try{
			setLoadingCheckBox(true);
			setDarkModeCheck(darkMode);
			const { data, error } = await supabaseClient.from('profiles').update({dark_mode: darkMode}).eq('id',profile["id"]);
		}catch(error){
			console.log("ERROR AIE .", error);
		}finally{
			setLoadingCheckBox(false);
		}
	}
	
	async function saveProfile(){
		try{
			setLoadingSaveBtn(true);
			const { data, error } = await supabaseClient.from('profiles').update({username:username,name:name,profile_desc:profileDesc}).eq('id',profile["id"]);
		}catch(error){
			console.log("ERROR AIE .", error);
		}finally{
			setLoadingSaveBtn(false);
		}
	}

	if(loading){
		return <Loader/>;
	}
  return (
	<ScrollView contentContainerStyle={[gStyles.contentContainerStyleScrollView, (darkTheme ? gStyles.containerBckDark :gStyles.containerBckLight)]}>
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
					style={[
					(darkTheme? {color:themeColors.darkTextColor}:{color:themeColors.lightTextColor})
					]}
		      	/>
		      	<Input
					label="Name"
					leftIcon={<FontAwesomeIcon icon={faUser} color={'grey'} size={24}/>}
		      		onChangeText={text => setName(text)}
		      		value={name}
		      		placeholder="Enter your name"
		      		autoCapitalize={'none'}
		      		maxLength={127}
					style={[
					(darkTheme? {color:themeColors.darkTextColor}:{color:themeColors.lightTextColor})
					]}
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
					style={[
					(darkTheme? {color:themeColors.darkTextColor}:{color:themeColors.lightTextColor})
					]}
		      		/>
		      	{loadingSaveBtn ? 
		      		<Loader/>
		      	:
			      	<Button  title={"Save Changes"} onPress={() => {saveProfile()}}/>
 		      	}
		      	
	      		<View style={[gStyles.rowContainer,gStyles.alignItemsCenter, gStyles.mgBottom20, gStyles.mgTop20]}>
					<Text style={[gStyles.mgRight20,(darkTheme? {color:themeColors.darkTextColor}:{color:themeColors.lightTextColor})]}>Profile picture : </Text>
	      			{avatarUrl? 
	      			<DisplayProfilePicture 
	      					width={50} 
			    			height={50} 
			    			borderRadius={50}/>
//			    		<DisplayPictureUrl 
//			    			uri={avatarUrl} 
//			    			key={avatarUrl}
//			    			userIdFolder={profile['id']} 
//			    			width={50} 
//			    			height={50} 
//			    			borderRadius={50}/>
    					:
						<Image source={require('../../static/images/user/defaultAvatar.png')} style={[{width:50,height:50,borderRadius:50}]}/>
    					}
	      			<View style={[{position:"absolute", right:0, bottom:8}]}>
			      		<UploadPicture buttonTitle={"Change picture"} color={darkTheme ? themeColors.darkTextColor:themeColors.lightTextColor} urlSetter={setAvatarUrl} avatarUrl={avatarUrl}
						/>
	      			</View>
				</View>
				{loadingCheckBox ? 
					<Loader/>
				: 
					<BouncyCheckbox
					  size={25}
					  fillColor="#8989FF"
					  unfillColor="rgba(0,0,0,0)"
					  text="DARK MODE ?"
					  iconStyle={{ borderColor: "red" }}
					  innerIconStyle={{ borderWidth: 2 }}
					  isChecked={darkModeCheck }
					  textStyle={{ fontFamily: "JosefinSans-Regular",textDecorationLine: "none", color: (darkTheme? themeColors.darkTextColor:themeColors.lightTextColor)}}
					  onPress={(isChecked: boolean) => {setDarkMode(isChecked)}}
					/>
				}
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
