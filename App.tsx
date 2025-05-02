import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { theme } from './src/theme/theme';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
