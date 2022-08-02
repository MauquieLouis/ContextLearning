// /src/context/userContext.js
import * as React from 'react';
import { createContext, useContext, useEffect, useRef, useState} from "react";
import { supabaseClient  } from '../../lib/initSupabase';

export const UserContext = createContext({
  user: null,
  session: null,
});

export const UserContextProvider = ({ props, children }) => {
	
	const[session, setSession] = useState(null);
	const[user, setUser] = useState(null);
	
	
	useEffect(() => {
		const session = supabaseClient .auth.session();
		setSession(session);
		setUser(session?.user ?? null);
		const { data : authListener } = supabaseClient .auth.onAuthStateChange(async (event, session) => {
			console.log('Supabase auth event : ' +event);
			setSession(session);
			setUser(session?.user ?? null);
		});
		
		return () => {
			authListener.unsubscribe();
		};
	},[]);
	
	const value = {
		session,
		user,
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

//const useUserContext = () => useContext(UserContext);

//export {UserContext as default, UserContextProvider, useUserContext};


