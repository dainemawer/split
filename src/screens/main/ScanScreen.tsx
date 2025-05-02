import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScanScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Scan Bill
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Point your camera at the QR code on the bill
        </Text>

        <View style={styles.scanArea}>
          {/* TODO: Add QR code scanner component */}
          <Text variant="bodyMedium" style={styles.placeholderText}>
            QR Code Scanner Placeholder
          </Text>
        </View>

        <Button
          mode="contained"
          onPress={() => {}}
          accessibilityLabel="Open camera button"
          accessibilityHint="Press to open camera for scanning QR code"
          style={styles.button}
        >
          Open Camera
        </Button>

        <Button
          mode="outlined"
          onPress={() => {}}
          accessibilityLabel="Enter bill manually button"
          accessibilityHint="Press to enter bill details manually"
          style={styles.button}
        >
          Enter Bill Manually
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
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 32,
    color: '#666',
    textAlign: 'center',
  },
  scanArea: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  placeholderText: {
    color: '#666',
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
});

export default ScanScreen;
