// src/components/pictureUtils/displayProfilePicture.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, { useState, useEffect } from 'react';
import DisplayPictureUrl from './displayPictureUrl'
//-----------------------------
// Import SupabaseClient
//-----------------------------
//-----------------------------

//-----------------------------
import { useUserContext } from "../../context/userContext";
//-----------------------------
// End Import
//-----------------------------
//DisplayProfilePicture Component
const DisplayProfilePicture = (props) => {
	
	const {profile} = useUserContext();
	
	useEffect(() => {
	}, []);

  return (
		<DisplayPictureUrl 
			uri={profile["avatar_url"]} 
			key={profile["avatar_url"]} 
			userIdFolder={profile['id']}
			width={props["width"]} 
			height={props["height"]} 
			borderRadius={props["borderRadius"]}/>
  );
}
// Export component -------
export default DisplayProfilePicture;