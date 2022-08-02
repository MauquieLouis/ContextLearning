// /src/context/appContext.js
import * as React from 'react';
import { createContext, useContext, useEffect, useRef, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from "@supabase/supabase-js";
//import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
	
	//-----------------------------S U P A B A S E--------------------------------//
	const supabaseUrl = SUPABASE_URL;
	const supabaseKey = SUPABASE_ANON_KEY;
	const options = {localStorage: AsyncStorage, detectSessionInUrl: false};
	const supabase = createClient(supabaseUrl,supabaseKey, options);
	//---------------------------------------------------------------------------//
	
	
	//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
	// - - - - - - - G E T   L O C A T I O N   F U N C T I O N - - - - - - - //
	//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
	
	//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
	// - - - - - - - G E T   U S E R N A M E   F U N C T I O N - - - - - - - //
	//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//

	
	
	useEffect(() => {
		
		return() => {
			console.log("End useEffect in AppContext");
		};
	}, []);
	
	return(
		<AppContext.Provider
			value={{
				username,
				country:countryCode
				}}
			>
			{children}
		</AppContext.Provider>
	);
	//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
	// - - - - - - - - - - - - - - E N D - - - - - - - - - - - - - - - - - - //
	//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//
}

const useAppContext = () => useContext(AppContext);

export {AppContext as default, AppContextProvider, useAppContext};


