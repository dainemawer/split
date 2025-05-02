import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPasswordScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Reset Password
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Enter your email to receive a password reset link
        </Text>

        <View style={styles.form}>
          <TextInput
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Email input"
            accessibilityHint="Enter your email address to receive password reset instructions"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={() => {}}
            accessibilityLabel="Send reset link button"
            accessibilityHint="Press to send password reset instructions to your email"
            style={styles.button}
          >
            Send Reset Link
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

export default ForgotPasswordScreen;
