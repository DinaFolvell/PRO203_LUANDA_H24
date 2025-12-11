import { StyleSheet, View, Text } from 'react-native';

export interface DayData {
  dayName: string;
  date: number;
}

export interface DaysProps {
  days: DayData[];
}

export function DayCell({ days }: DaysProps) {
  return (
    <View style={styles.root}>
      {days.map((day, index) => (
        <View key={`day-${index}`} style={styles.dayContainer}>
          <Text style={styles.dayName}>{day.dayName}</Text>
          <Text style={styles.dateNumber}>{day.date}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomColor: 'rgba(224, 224, 224, 1)',
    borderBottomWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  dayContainer: {
    paddingTop: 4,
    paddingLeft: 8,
    paddingBottom: 4,
    paddingRight: 40,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(247, 247, 247, 1)',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(224, 224, 224, 1)',
  },
  dayName: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
  },
  dateNumber: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 25.616,
  },
});