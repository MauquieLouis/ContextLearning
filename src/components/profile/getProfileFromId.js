// src/components/profile/getProfileFromId.js
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, { useState, useEffect } from 'react';
//-----------------------------
// Import SupabaseClient
//-----------------------------
import { supabaseClient } from '../../../lib/initSupabase';
 
//GetProfileFromId component
const GetProfileFromId = async(id, setLoader, setProfile) => {
	console.log("GET PROFILE FUNC : ");
	console.log(id, setLoader);
	setLoader(true);
	try{
		const { data: profile, error } = await supabaseClient.from('profiles').select("*").eq('id',id);
		if(error){
			console.log("Error in GetProfileFromId in getProfileFromId.js");
			console.log(error);
		}
		setProfile(profile);
		setLoader(false);
		console.log(" --== PrOfIlE ==-- ");
		console.log(profile)
		return profile;
	}catch(error){
		console.log("Error in GetProfileFromId in getProfileFromId.js");
		console.log(error);
	}finally{
		setLoader(false);
	}
}

// Export component -------
export default GetProfileFromId;