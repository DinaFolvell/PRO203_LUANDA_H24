import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import type { ViewStyle, StyleProp } from 'react-native';

export interface AttendanceOverviewProps {
  style?: StyleProp<ViewStyle>;
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

interface AttendanceItem {
  count: number;
  label: string;
  icon: any;
}

const attendanceItems: AttendanceItem[] = [
  { count: 30, label: 'Alle barn', icon: require('../assets/icons/all-icon.png') },
  { count: 3, label: 'Tilstede', icon: require('../assets/icons/green-present-icon.png') },
  { count: 4, label: 'Forventet', icon: require('../assets/icons/yellow-expected-icon.png') },
  { count: 3, label: 'Hentet', icon: require('../assets/icons/purple-picked-up-icon.png') },
  { count: 2, label: 'Fravær', icon: require('../assets/icons/red-absent-icon.png') },
];

export function AttendanceOverview({ style, activeIndex, onIndexChange }: AttendanceOverviewProps) {
  return (
    <View style={[styles.bar, style]}>
      {attendanceItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.statusItem}
          onPress={() => onIndexChange(index)}
        >
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{item.count}</Text>
            <Image source={item.icon} style={styles.icon} />
          </View>
          <Text style={styles.labelText}>{item.label}</Text>
          {activeIndex === index && <View style={styles.activeMarker} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  statusItem: { flex: 1, alignItems: 'center', padding: 4 },
  countContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  countText: { fontSize: 18, fontWeight: '600' },
  labelText: { fontSize: 14, fontWeight: '500' },
  icon: { width: 20, height: 20, resizeMode: 'contain', marginLeft: 4 },
  activeMarker: {
    height: 2,
    backgroundColor: 'black',
    width: '100%',
    marginTop: 4,
  },
});