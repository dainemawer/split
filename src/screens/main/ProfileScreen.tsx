import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, List, Button, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.profileHeader}>
            <Avatar.Text
              size={80}
              label="JD"
              accessibilityLabel="User avatar"
            />
            <Text variant="headlineMedium" style={styles.name}>
              John Doe
            </Text>
            <Text variant="bodyLarge" style={styles.email}>
              john.doe@example.com
            </Text>
          </View>

          <List.Section>
            <List.Item
              title="Payment Methods"
              left={props => <List.Icon {...props} icon="credit-card" />}
              accessibilityLabel="Payment methods"
              accessibilityHint="Press to manage payment methods"
            />
            <List.Item
              title="Notifications"
              left={props => <List.Icon {...props} icon="bell" />}
              accessibilityLabel="Notifications"
              accessibilityHint="Press to manage notifications"
            />
            <List.Item
              title="Privacy"
              left={props => <List.Icon {...props} icon="shield" />}
              accessibilityLabel="Privacy settings"
              accessibilityHint="Press to manage privacy settings"
            />
            <List.Item
              title="Help & Support"
              left={props => <List.Icon {...props} icon="help-circle" />}
              accessibilityLabel="Help and support"
              accessibilityHint="Press to access help and support"
            />
          </List.Section>

          <Button
            mode="outlined"
            onPress={() => {}}
            accessibilityLabel="Sign out button"
            accessibilityHint="Press to sign out of your account"
            style={styles.signOutButton}
          >
            Sign Out
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  name: {
    marginTop: 16,
    marginBottom: 4,
  },
  email: {
    color: '#666',
  },
  signOutButton: {
    marginTop: 32,
  },
});

export default ProfileScreen;
