// /src/context/userContext.js
import * as React from 'react';
import { createContext, useContext, useEffect, useRef, useState} from "react";
import { supabaseClient  } from '../../lib/initSupabase';

export const UserContext = createContext({
	user: null,
	session: null,
	profile: null,
	loading: false,
	darkTheme: false,
});

export const UserContextProvider = ({ props, children }) => {
	
	const[session, setSession] = useState(null);
	const[user, setUser] = useState(null);
	const[profile, setProfile] = useState(null);
	const[loading, setLoading] = useState(false);
	const[darkTheme, setDarkTheme] = useState(true);

	//-------- ASYNC : LOAD PROFILE ---------//   
	async function LoadProfile(){
		try{
			setLoading(true);
			const response = await supabaseClient.from('profiles').select("*").eq('id',user["identities"][0]["id"]);
			setProfile(response["data"][0]);
			setDarkTheme(response["data"][0]["dark_mode"]);
		}catch(error){
			console.log("ERROR  in 'LoadProfile' function in userContext.js ");
			console.log(error);
		}finally{
			setLoading(false);
		}
	}	

	//------ USE EFFECT ------- //
	useEffect(() => {
		const session = supabaseClient.auth.session();
		setSession(session);
		setUser(session?.user ?? null);		
		
		const { data : authListener } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
			console.log('Supabase auth event : ' +event);
			setSession(session);
			setUser(session?.user ?? null);
		});
		
		LoadProfile();
		if(user){
//			console.log("CREATE PROFILE LISTENER !")
			const profiles = supabaseClient.from('profiles:id=eq.'+user["identities"][0]["id"]).on('*', payload => {
				console.log("PROFILE CHANGE GLOBAL IN SUPABASE MY FRIEND")
//				console.log(payload);
				setProfile(payload["new"]);
				setDarkTheme(payload["new"]["dark_mode"]);
			}).subscribe();
//			console.log(profiles);
//			console.log("END CREATE PROFILE LISTENER !")
		}
		
		
		return () => {
			authListener.unsubscribe();
//			supabaseClient.removeAllSubscriptions();	
//			if(profileListener){
//				profileListener.unsubscribe();
//			}
		};
	},[user]);
	
	const value = {
		session,
		user,
		profile,
		loading,
		darkTheme
	};
	
	return (<UserContext.Provider value={value} {...props}>
				{children}
			</UserContext.Provider>
			);
	//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
	// - - - - - - - - - - - - - - E N D - - - - - - - - - - - - - - - - - - //
	//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
}

export const useUserContext = () => {
	const context = useContext(UserContext);
	if(context === undefined){
		throw new Error('useUser must be used within a UserContextProvider.')
	}
	return context;
}