// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
const apiUrl = import.meta.env.VITE_API_URL;
const anonKey = import.meta.env.VITE_SOME_KEY;

const supabase = createClient(apiUrl, anonKey,
    {
        auth: {
            storage: localStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
          },
          global: {headers: {'Access-Control-Allow-Origin': '*'}}
    }
);

export default supabase;