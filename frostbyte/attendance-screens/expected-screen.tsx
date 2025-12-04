import { ChildList } from '@/components/child-list';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ExpectedScreen() {
  return (
    <View style={styles.container}>
      <ChildList filterStatus="expected" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center' 
  },
});