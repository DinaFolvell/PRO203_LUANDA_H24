import { ChildList } from '@/components/child-list';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function PickedUpScreen() {
  return (
    <View style={styles.container}>
      <ChildList statusFilter="picked_up" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});