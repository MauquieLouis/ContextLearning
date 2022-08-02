// navigation/navigation.js
//-----------------------------
// Import all stranges modules from react / native / navigation
//-----------------------------
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text } from 'react-native';
//-----------------------------
// Import all screens
//-----------------------------
import MapScreen from '../src/screens/mapScreen';
import SettingsScreen from '../src/screens/settingsScreen';
//-----------------------------
// Import Usercontext
//-----------------------------
import { useUserContext } from "../src/context/userContext";
//-----------------------------
// Import navigation stack for tabs
//-----------------------------
import AuthNavigation from './authNavigation';
import MessagingsNavigation from './messagingsNavigation';
import ProfileNavigation from './profileNavigation';
//-----------------------------
// Import icons
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarked, faComment, faUser, faCog, faUserLock } from '@fortawesome/free-solid-svg-icons';
//-----------------------------
// End import
//-----------------------------

//Tab Navigator Creation.
const bottomTab = createBottomTabNavigator();

const MyNavigator = () =>{
//		const [session, setSession] = useState(null);
		
		const {session,user} = useUserContext(); 
		
		useEffect(() =>{

		})
	return(
		<NavigationContainer>
		{!session ? 
		//If no session activate :
		/**Connexion or account creation */
		<>
			<AuthNavigation/>
		</>  
		:
		//If session activate
			
				<bottomTab.Navigator screenOptions={{
					tabBarActiveTintColor:iconStyle.focusedColor,
					tabBarInactiveTintColor:iconStyle.notFocusedcolor,
					tabBarShowLabel:iconStyle.showText,
					tabBarStyle:styles.tabBarStyle,
					tabBarHideOnKeyboard:true
				}}>
					{/*---------------------------------------- M A P   S C R E E N ------------------------------------------------*/}
					<bottomTab.Screen name="Map" component={MapScreen} options={{
						tabBarIcon : props => <FontAwesomeIcon  icon={faMapMarked} color={colorIconTab(props)} size={iconStyle.size}/>,
						title:"Map",//{/*Change with Translation */}
					}}/>
					{/*------------------------------- P R O F I L E / L O G I N   S C R E E N -------------------------------------*/}					
					<bottomTab.Screen name="Messagings" component={MessagingsNavigation}  options={{
						tabBarIcon : props => <FontAwesomeIcon  icon={faComment} color={colorIconTab(props)} size={iconStyle.size}/>,
						title:"Messagings",//{/*Change with Translation */}
					}} />
					{/*------------------------------- P R O F I L E / L O G I N   S C R E E N -------------------------------------*/}					
					<bottomTab.Screen name="Profile" component={ProfileNavigation}  options={{
						tabBarIcon : props => <FontAwesomeIcon  icon={faUser} color={colorIconTab(props)} size={iconStyle.size}/>,
						title:"profile",//{/*Change with Translation */}
					}} />
				</bottomTab.Navigator>
			
		}
		</NavigationContainer>
	);
}
export default MyNavigator;

//-----------------------------
// Icon style
//-----------------------------
const iconStyle={
	//Color for focused tab
	focusedColor:'black',
	//Color for not focused tab
	notFocusedcolor:'#C4C4C4',
	//Size of tab icons
	size:24,
	//Show text of the tab icon
	showText: false,
}
//Function to change color of the focused tab
function colorIconTab(props){
	return props.focused ? iconStyle.focusedColor: iconStyle.notFocusedcolor;
}

//-----------------------------
// styles
//-----------------------------
const styles = StyleSheet.create({
	tabBarStyle:{
		height:40,
	}
})