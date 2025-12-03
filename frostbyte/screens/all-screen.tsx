import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AllScreen() {
  return (
    <View style={styles.container}>
      <Text>All children</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
