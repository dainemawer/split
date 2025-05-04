import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import Constants from 'expo-constants';
import { collectDeviceInfo } from '../utils/deviceInfo';
import { getGravatarProfile } from '../utils/gravatar';

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, redirectUrl: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInWithMeta: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);

      // Handle profile creation after email verification
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', session.user.id)
          .single();

        if (!profile) {
          // Get Gravatar URL
          const gravatarUrl = await getGravatarProfile(session.user.email || '');

          // Create profile if it doesn't exist
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: session.user.id,
                full_name: session.user.user_metadata.full_name,
                email: session.user.email,
                avatar_url: gravatarUrl,
                updated_at: new Date().toISOString(),
              },
            ]);

          if (profileError) {
            console.error('Error creating profile:', profileError);
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    // Collect device info after successful sign in
    await collectDeviceInfo();
  };

  const signUp = async (email: string, password: string, fullName: string, redirectUrl: string) => {
    // Get Gravatar URL before signup
    const gravatarUrl = await getGravatarProfile(email);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          avatar_url: gravatarUrl,
        },
      },
    });

    if (authError) throw authError;
  };

  const signInWithGoogle = async () => {
    const redirectUrl = Constants.appOwnership === 'expo'
      ? makeRedirectUri({
          native: 'split://auth/callback',
        })
      : makeRedirectUri({
          scheme: 'split',
          path: 'auth/callback',
        });

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) throw error;
    if (data?.url) {
      await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
      // Collect device info after successful Google sign in
      await collectDeviceInfo();
    }
  };

  const signInWithApple = async () => {
    const redirectUrl = Constants.appOwnership === 'expo'
      ? makeRedirectUri({
          native: 'split://auth/callback',
        })
      : makeRedirectUri({
          scheme: 'split',
          path: 'auth/callback',
        });

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) throw error;
    if (data?.url) {
      await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
      await collectDeviceInfo();
    }
  };

  const signInWithMeta = async () => {
    const redirectUrl = Constants.appOwnership === 'expo'
      ? makeRedirectUri({
          native: 'split://auth/callback',
        })
      : makeRedirectUri({
          scheme: 'split',
          path: 'auth/callback',
        });

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) throw error;
    if (data?.url) {
      await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
      await collectDeviceInfo();
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{
      session,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signInWithApple,
      signInWithMeta,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
