import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    navigation.navigate('Login');
  };

  const handleResetPassword = async () => {
    // TODO: Implement password reset
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Reset Password
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Enter your email to receive a password reset link
        </Text>

        {error && (
          <Text style={styles.error} variant="bodyMedium">
            {error}
          </Text>
        )}

        <View style={styles.form}>
          <TextInput
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            accessibilityLabel="Email input"
            accessibilityHint="Enter your email address to receive password reset instructions"
            style={styles.input}
            disabled={loading}
          />

          <Button
            mode="contained"
            onPress={handleResetPassword}
            loading={loading}
            disabled={loading}
            accessibilityLabel="Send reset link button"
            accessibilityHint="Press to send password reset instructions to your email"
            style={styles.button}
          >
            Send Reset Link
          </Button>

          <Button
            mode="text"
            onPress={handleBack}
            disabled={loading}
            accessibilityLabel="Back to login button"
            accessibilityHint="Press to return to the login screen"
            style={styles.backButton}
          >
            Back to Login
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
  backButton: {
    marginTop: 8,
  },
  error: {
    color: '#B00020',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default ForgotPasswordScreen;
