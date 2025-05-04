import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { makeRedirectUri } from 'expo-auth-session';
import Constants from 'expo-constants';

const supabaseUrl = 'https://rbxgutjwwhlthznsurnf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJieGd1dGp3d2hsdGh6bnN1cm5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMTI0NTIsImV4cCI6MjA2MTY4ODQ1Mn0.mPHw4NAb5tKUIP3p_sTPgYKzGZmzfVYQCEbXJttUR-s';

// Use the appropriate redirect URL based on whether we're in Expo Go or a standalone app
export const redirectUrl = Constants.appOwnership === 'expo'
  ? makeRedirectUri({
      // For Expo Go
      native: 'split://auth/callback',
    })
  : makeRedirectUri({
      // For standalone app
      scheme: 'split',
      path: 'auth/callback',
    });

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storageKey: 'split-auth',
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
