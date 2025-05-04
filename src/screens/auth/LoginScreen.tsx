import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { useAuth } from '../../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { signIn, signInWithGoogle, signInWithApple, signInWithMeta } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during Google sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithApple();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during Apple sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleMetaSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithMeta();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during Meta sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            Welcome Back
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Sign in to continue
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
              accessibilityHint="Enter your email address"
              style={styles.input}
              disabled={loading}
            />

            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              accessibilityLabel="Password input"
              accessibilityHint="Enter your password"
              style={styles.input}
              disabled={loading}
            />

            <Button
              mode="contained"
              onPress={handleSignIn}
              loading={loading}
              disabled={loading}
              accessibilityLabel="Sign in button"
              accessibilityHint="Press to sign in"
              style={styles.button}
            >
              Sign In
            </Button>

            <View style={styles.socialButtons}>
              <Button
                mode="outlined"
                onPress={handleGoogleSignIn}
                disabled={loading}
                accessibilityLabel="Sign in with Google button"
                accessibilityHint="Press to sign in with Google"
                style={styles.socialButton}
                icon={({ size, color }) => (
                  <MaterialCommunityIcons name="google" size={size} color={color} />
                )}
              >
                Sign in with Google
              </Button>

              <Button
                mode="outlined"
                onPress={handleAppleSignIn}
                disabled={loading}
                accessibilityLabel="Sign in with Apple button"
                accessibilityHint="Press to sign in with Apple"
                style={styles.socialButton}
                icon={({ size, color }) => (
                  <MaterialCommunityIcons name="apple" size={size} color={color} />
                )}
              >
                Sign in with Apple
              </Button>

              <Button
                mode="outlined"
                onPress={handleMetaSignIn}
                disabled={loading}
                accessibilityLabel="Sign in with Meta button"
                accessibilityHint="Press to sign in with Meta"
                style={styles.socialButton}
                icon={({ size, color }) => (
                  <MaterialCommunityIcons name="facebook" size={size} color={color} />
                )}
              >
                Sign in with Meta
              </Button>
            </View>

            <View style={styles.links}>
              <Button
                mode="text"
                onPress={() => navigation.navigate('Register')}
                disabled={loading}
                accessibilityLabel="Create account button"
                accessibilityHint="Press to create a new account"
              >
                Create Account
              </Button>
              <Button
                mode="text"
                onPress={() => navigation.navigate('ForgotPassword')}
                disabled={loading}
                accessibilityLabel="Forgot password button"
                accessibilityHint="Press to reset your password"
              >
                Forgot Password?
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
  socialButtons: {
    gap: 12,
    marginTop: 16,
  },
  socialButton: {
    marginTop: 0,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  error: {
    color: '#B00020',
    textAlign: 'center',
    marginBottom: 16,
  },
});
export default LoginScreen;

