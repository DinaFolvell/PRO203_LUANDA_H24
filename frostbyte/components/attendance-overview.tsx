import { View, Text, Image, StyleSheet } from 'react-native';
import type { ViewStyle, StyleProp } from 'react-native';

export interface AttendanceOverviewProps {
  style?: StyleProp<ViewStyle>;
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

export function AttendanceOverview(props: AttendanceOverviewProps) {
  return (
    <View style={[styles.root, props.style]}>
      {attendanceItems.map((item, index) => (
        <View key={index} style={styles.statusItem}>
          <View style={[styles.innerWrapper, index === 0 && styles.underline]}>
            <View style={styles.countContainer}>
              <Text style={styles.countText}>{item.count}</Text>
              <Image source={item.icon} style={styles.icon} />
            </View>
            <Text style={styles.labelText}>{item.label}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  statusItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 4,
  },
  innerWrapper: {
    paddingHorizontal: 2,
    paddingBottom: 2,
    alignItems: 'center',
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 1)',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  countText: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.32,
    color: 'rgba(0, 0, 0, 1)',
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.24,
    color: 'rgba(0, 0, 0, 1)',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
