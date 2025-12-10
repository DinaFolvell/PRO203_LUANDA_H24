import { ChildList } from '@/components/check-in/child-list';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ExpectedTab() {
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