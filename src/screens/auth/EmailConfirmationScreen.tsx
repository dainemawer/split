import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type EmailConfirmationScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const EmailConfirmationScreen = () => {
  const navigation = useNavigation<EmailConfirmationScreenNavigationProp>();

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="email-check"
          size={80}
          color="#666"
          style={styles.icon}
        />

        <Text variant="headlineMedium" style={styles.title}>
          Check Your Email
        </Text>

        <Text variant="bodyLarge" style={styles.message}>
          We've sent you a confirmation email. Please check your inbox and click the link to verify your account.
        </Text>

        <Button
          mode="contained"
          onPress={handleBackToLogin}
          accessibilityLabel="Back to login button"
          accessibilityHint="Press to return to the login screen"
          style={styles.button}
        >
          Back to Login
        </Button>
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
    alignItems: 'center',
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
    lineHeight: 24,
  },
  button: {
    minWidth: 200,
  },
});

export default EmailConfirmationScreen;
