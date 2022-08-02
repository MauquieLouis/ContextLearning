import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './constant';

const options = {localStorage: AsyncStorage,autoRefreshToken: true,persistSession: true, detectSessionInUrl: false};
export const supabaseClient  = createClient(SUPABASE_URL,SUPABASE_ANON_KEY, options);
