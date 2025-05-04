import { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    console.log('Callback params:', params);

    // The code can come in different parameters depending on the flow
    const code = params.code || params.token || params.access_token;

    if (code) {
      console.log('Exchanging code for session:', code);
      supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
        if (error) {
          console.error('Error exchanging code for session:', error);
          router.replace('/auth/login');
        } else {
          console.log('Successfully verified email');
          // After successful verification, redirect to login
          router.replace('/auth/login');
        }
      });
    } else {
      console.log('No code found in URL parameters');
      router.replace('/auth/login');
    }
  }, [params]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 16 }}>Verifying your email...</Text>
    </View>
  );
}
