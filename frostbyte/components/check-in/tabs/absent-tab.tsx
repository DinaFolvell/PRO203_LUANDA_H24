import { ChildList } from '@/components/check-in/child-list';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function AbsentTab() {
  return (
    <View style={styles.container}>
      <ChildList filterStatus="absent" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center' 
  },
});