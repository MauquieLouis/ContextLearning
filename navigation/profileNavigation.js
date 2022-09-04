// navigation/profileNavigations.js
//-----------------------------
// Import all react bullshit and navigation
//-----------------------------
import * as React from 'react';
import {Button, Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//-----------------------------
// Import all component
//-----------------------------
import ProfileScreen from '../src/screens/profile/profileScreen';
import EditProfileScreen from '../src/screens/profile/editProfileScreen';


//Create a navigator
const ProfileNavigator = createNativeStackNavigator();

// profile Navigation
const ProfileNavigation = () => {
	
	return(
		<ProfileNavigator.Navigator screenOptions={{headerShown: true}}>
			{/** profile Screen */}
			<ProfileNavigator.Screen name="seeProfile" component={ProfileScreen}/>
				{/** edit profile Screen */}
			<ProfileNavigator.Screen name="editProfile" component={EditProfileScreen} 
				options={{
		          headerTitle: (props) => <Text>Back To Profile</Text>,
		          headerRight: () => (
		            <Button
		              onPress={() => alert('This is a button!')}
		              title="Info"
		              color="#ABABAB"
		            />
		          ),
        	}}
        	/>
			{/** New Account Screen */}
			{/**<ProfileNavigator.Screen name="avatar" component={Avatar}/> */}
		</ProfileNavigator.Navigator>
	);
	
}

export default ProfileNavigation;