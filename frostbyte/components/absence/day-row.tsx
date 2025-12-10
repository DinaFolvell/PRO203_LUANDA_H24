// components/absence/day-row.tsx
import { StyleSheet, View, Text } from 'react-native';

export interface DayRowProps {
  startDay: number;
}

export function DayRow({ startDay }: DayRowProps) {
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const days = Array.from({ length: 7 }, (_, i) => ({
    dayName: dayNames[i],
    date: startDay + i,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.childInfoPlaceholder} /> {/* same width as childInfo */}
      {days.map((day, index) => (
        <View key={`day-cell-${index}`} style={styles.dayCell}>
          <Text style={styles.dayName}>{day.dayName}</Text>
          <Text style={styles.date}>{day.date}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80, // match ChildCell height
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(224, 224, 224, 1)',
    backgroundColor: 'rgba(245, 245, 245, 1)',
  },
  childInfoPlaceholder: {
    width: 150, // same as childInfo column in ChildCell
  },
  dayCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', // align text to left
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(224, 224, 224, 1)',
    paddingLeft: 8, // add some padding from the left edge
  },
  dayName: {
    fontWeight: '600',
    fontSize: 14,
  },
  date: {
    fontSize: 20, // bigger number
    fontWeight: '700',
    color: 'rgba(50, 50, 50, 1)',
  },
});
