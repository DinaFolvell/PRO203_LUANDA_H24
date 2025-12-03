import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExpectedScreen() {
  return (
    <View style={styles.container}>
      <Text>Children expected</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
