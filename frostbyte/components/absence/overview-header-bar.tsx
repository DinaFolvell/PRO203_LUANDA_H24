import { StyleSheet, View, Text, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { ViewStyle, StyleProp } from 'react-native';

export interface HeaderBarProps {
  style?: StyleProp<ViewStyle>;
  week: number;
  mondayDate: Date;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
  onNotifications?: () => void;
}

export function HeaderBar({
  style,
  week,
  mondayDate,
  onPrevWeek,
  onNextWeek,
  onNotifications,
}: HeaderBarProps) {
  const monthNames = [
    'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
  ];

  const month = monthNames[mondayDate.getMonth()];
  const year = mondayDate.getFullYear();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.weekSection}>
        <View style={styles.titleWrapper}>
          <Text style={styles.weekTitle}>Uke {week} - {month} {year}</Text>
        </View>

        <View style={styles.chevronContainer}>
          <Pressable style={styles.chevronButton} onPress={onPrevWeek}>
            <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
          </Pressable>

          <Pressable style={styles.chevronButton} onPress={onNextWeek}>
            <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
          </Pressable>
        </View>
      </View>

      <View style={styles.notificationContainer}>
        <Pressable style={styles.notificationIconWrapper} onPress={onNotifications}>
          <MaterialIcons name="notifications-none" size={26} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 8,
    paddingLeft: 16,
    paddingBottom: 8,
    paddingRight: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'rgba(224, 224, 224, 1)',
    borderBottomWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  weekTitle: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 18,
    fontWeight: '600',
    flexShrink: 1,
  },
  weekSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  titleWrapper: {
    minWidth: 220,
  },
  chevronContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevronButton: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
});