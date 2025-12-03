import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PresentScreen() {
  return (
    <View style={styles.container}>
      <Text>Children present</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
