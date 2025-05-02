import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAuth } from '../../context/AuthContext';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { setIsAuthenticated } = useAuth();

  const handleSignIn = () => {
    // TODO: Replace with actual authentication logic
    setIsAuthenticated(true);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Welcome to Split
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Sign in to manage your bills
        </Text>

        <View style={styles.form}>
          <TextInput
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Email input"
            accessibilityHint="Enter your email address"
            style={styles.input}
          />

          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            accessibilityLabel="Password input"
            accessibilityHint="Enter your password"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleSignIn}
            accessibilityLabel="Sign in button"
            accessibilityHint="Press to sign in to your account"
            style={styles.button}
          >
            Sign In
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 8,
  },
});

export default LoginScreen;
