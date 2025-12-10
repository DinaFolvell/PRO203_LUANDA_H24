import { ChildList } from '@/components/check-in/child-list';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function AllTab() {
  return (
    <View style={styles.container}>
      <ChildList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center' 
  },
});
