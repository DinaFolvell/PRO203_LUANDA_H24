import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { ChildService } from '@/services/childService';

export interface AttendanceOverviewProps {
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

interface AttendanceItem {
  label: string;
  icon: any;
  countKey: 'all' | 'present' | 'expected' | 'picked_up' | 'absent';
}

const attendanceItems: AttendanceItem[] = [
  { label: 'Alle barn', icon: require('@/assets/icons/all-icon.png'), countKey: 'all' },
  { label: 'Tilstede', icon: require('@/assets/icons/green-present-icon.png'), countKey: 'present' },
  { label: 'Forventet', icon: require('@/assets/icons/yellow-expected-icon.png'), countKey: 'expected' },
  { label: 'Hentet', icon: require('@/assets/icons/purple-picked-up-icon.png'), countKey: 'picked_up' },
  { label: 'Fravær', icon: require('@/assets/icons/red-absent-icon.png'), countKey: 'absent' },
];

export function AttendanceOverview({ activeIndex, onIndexChange }: AttendanceOverviewProps) {
  const counts = useMemo(() => ChildService.getAttendanceCounts(), []);

  return (
    <View style={styles.bar}>
      {attendanceItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.statusItem}
          onPress={() => onIndexChange(index)}
        >
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{counts[item.countKey]}</Text>
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
    paddingHorizontal: 16,
  },
  statusItem: { alignItems: 'center', padding: 4 },
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