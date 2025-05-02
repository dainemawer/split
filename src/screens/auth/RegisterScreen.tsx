import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Create Account
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Join Split to start managing your bills
        </Text>

        <View style={styles.form}>
          <TextInput
            label="Full Name"
            mode="outlined"
            accessibilityLabel="Full name input"
            accessibilityHint="Enter your full name"
            style={styles.input}
          />

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

          <TextInput
            label="Confirm Password"
            mode="outlined"
            secureTextEntry
            accessibilityLabel="Confirm password input"
            accessibilityHint="Re-enter your password"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={() => {}}
            accessibilityLabel="Create account button"
            accessibilityHint="Press to create your account"
            style={styles.button}
          >
            Create Account
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

export default RegisterScreen;
