import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const HistoryScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            Bill History
          </Text>

          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">Filter</Text>
              <List.Section>
                <List.Item
                  title="All Bills"
                  left={props => <List.Icon {...props} icon="format-list-bulleted" />}
                  accessibilityLabel="All bills filter"
                  accessibilityHint="Press to view all bills"
                />
                <List.Item
                  title="Pending"
                  left={props => <List.Icon {...props} icon="clock-outline" />}
                  accessibilityLabel="Pending bills filter"
                  accessibilityHint="Press to view pending bills"
                />
                <List.Item
                  title="Completed"
                  left={props => <List.Icon {...props} icon="check-circle-outline" />}
                  accessibilityLabel="Completed bills filter"
                  accessibilityHint="Press to view completed bills"
                />
              </List.Section>
            </Card.Content>
          </Card>

          <Text variant="bodyLarge" style={styles.emptyText}>
            No bills found
          </Text>
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
    marginBottom: 24,
  },
  card: {
    marginBottom: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 32,
  },
});

export default HistoryScreen;
