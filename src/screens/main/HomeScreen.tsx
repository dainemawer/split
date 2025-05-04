import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            Home
          </Text>

          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">Recent Bills</Text>
              <Text variant="bodyMedium" style={styles.emptyText}>
                No recent bills to display
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">Pending Payments</Text>
              <Text variant="bodyMedium" style={styles.emptyText}>
                No pending payments
              </Text>
            </Card.Content>
          </Card>

          <Button
            mode="contained"
            onPress={() => {}}
            accessibilityLabel="Scan new bill button"
            accessibilityHint="Press to scan a new bill"
            style={styles.scanButton}
          >
            Scan New Bill
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    marginBottom: 16,
  },
  emptyText: {
    marginTop: 8,
    color: '#666',
  },
  scanButton: {
    marginTop: 16,
  },
});

export default HomeScreen;
