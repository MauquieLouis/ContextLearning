import Config from "react-native-config";

if (!Config.REACT_NATIVE_SUPABASE_URL) {
  console.log('constants.ts', 'Make sure you have a `.env` file to populate your variables.');
  console.log(Config);
}

export const SUPABASE_URL = Config.REACT_NATIVE_SUPABASE_URL || ''
export const SUPABASE_ANON_KEY = Config.REACT_NATIVE_SUPABASE_ANON_KEY || ''