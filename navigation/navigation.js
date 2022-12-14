// navigation/navigation.js
//-----------------------------
// Import all stranges modules from react / native / navigation
//-----------------------------
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text } from 'react-native';
import themeColors from '../src/static/styles/globalStyle/themeColor';
//-----------------------------
// Import all screens
//-----------------------------
import MapScreen from '../src/screens/mapScreen';
import SettingsScreen from '../src/screens/settingsScreen';
//-----------------------------
// Import Usercontext
//-----------------------------
import { useUserContext } from "../src/context/userContext";
import { useMessagingContext } from "../src/context/messagingContext";
//-----------------------------
// Import navigation stack for tabs
//-----------------------------
import AuthNavigation from './authNavigation';
import MessagingsNavigation from './messagingsNavigation';
import ProfileNavigation from './profileNavigation';
import PicturesNavigation from './picturesNavigation';
//-----------------------------
// Import icons
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarked, faComment, faUser, faPlusSquare, faPercent } from '@fortawesome/free-solid-svg-icons';
//-----------------------------
// End import
//-----------------------------

//Tab Navigator Creation.
const bottomTab = createBottomTabNavigator();

const MyNavigator = () =>{
//		const [session, setSession] = useState(null);
		
		const {session, user, darkTheme, profile} = useUserContext(); 
		const { newMessage, numberOfUnreadedMessaging } = useMessagingContext();
		
		const [tabBarBadge, setTabBarBadge] = useState(false);
		
		useEffect(() => {
		}, [darkTheme]);
		
		useEffect(() => {
			if(numberOfUnreadedMessaging != 0){
				setTabBarBadge(numberOfUnreadedMessaging);
			}else{
				setTabBarBadge(false);
			}
		},[numberOfUnreadedMessaging]);
		
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
				tabBarActiveTintColor:iconStyle.focusedLightColor,
				tabBarInactiveTintColor:iconStyle.notFocusedcolor,
				tabBarShowLabel:iconStyle.showText,
				tabBarStyle:(darkTheme ? styles.tabBarStyleDark:styles.tabBarStyleLight),
				tabBarHideOnKeyboard:true,
				headerShown:false,		
			}}>
				{/*---------------------------------------- M A P   S C R E E N S ------------------------------------------------*/}
				<bottomTab.Screen name="Map" component={MapScreen} options={{
					tabBarIcon : props => <FontAwesomeIcon  icon={faMapMarked} color={colorIconTab(props, darkTheme)} size={iconStyle.size}/>,
					title:"Map",//{/*Change with Translation */}
				}}/>
				{/*------------------------------- P I C T U R E S    S C R E E N S-------------------------------------*/}					
				<bottomTab.Screen name="Pictures" component={PicturesNavigation} options={{
					tabBarIcon : props => <FontAwesomeIcon icon={faPlusSquare} color={colorIconTab(props, darkTheme)} size={iconStyle.size}/>,
					title:'pictures',
				}}/>
				{/*------------------------------- P I C T U R E S    S C R E E N S-------------------------------------*/}					
				<bottomTab.Screen name="Rating" component={PicturesNavigation} options={{
					tabBarIcon : props => <FontAwesomeIcon icon={faPercent} color={colorIconTab(props, darkTheme)} size={iconStyle.size}/>,
					title:'rating',
				}}/>
				{/*------------------------------- M E S S A G I N G   S C R E E N S -------------------------------------*/}					
				<bottomTab.Screen name="Messagings" component={MessagingsNavigation}  options={{
					tabBarIcon : props => <FontAwesomeIcon  icon={faComment} color={colorIconTab(props , darkTheme)} size={iconStyle.size}/>,
					title:"Messagings",//{/*Change with Translation */}
					tabBarBadge : tabBarBadge 
				}} />
				{/*------------------------------- P R O F I L E / L O G I N   S C R E E N S -------------------------------------*/}					
				<bottomTab.Screen name="Profile" component={ProfileNavigation}  options={{
					tabBarIcon : props => <FontAwesomeIcon  icon={faUser} color={colorIconTab(props , darkTheme)} size={iconStyle.size}/>,
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
	focusedLightColor:'black',
	focusedDarkColor:'#ffffff',
	//Color for not focused tab
	notFocusedcolor:'#C4C4C4',
	//Size of tab icons
	size:24,
	//Show text of the tab icon
	showText: false,
}
//Function to change color of the focused tab
function colorIconTab(props, dark_theme){
	return props.focused ? (dark_theme ? iconStyle.focusedDarkColor:iconStyle.focusedLightColor): iconStyle.notFocusedcolor;
}

//-----------------------------
// styles
//-----------------------------

const styles = StyleSheet.create({
	tabBarStyleLight:{
		height:40,
		backgroundColor:themeColors.LightBackgroundTab,
//		backgroundColor:'black',
	},
	tabBarStyleDark:{
		height:40,
		backgroundColor:themeColors.darkBackgroundTab,
	}
})
