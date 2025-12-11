import { StyleSheet, View, Text } from 'react-native';

export interface DayRowProps {
  startDay: number;
}

export function DayRow({ startDay }: DayRowProps) {
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = ((startDay + i - 1) % 31) + 1;
    return {
      dayName: dayNames[i],
      date,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.childInfoPlaceholder} />
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
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(224, 224, 224, 1)',
    backgroundColor: 'rgba(245, 245, 245, 1)',
  },
  childInfoPlaceholder: {
    width: 150,
  },
  dayCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(224, 224, 224, 1)',
    paddingLeft: 8,
  },
  dayName: {
    fontWeight: '600',
    fontSize: 14,
  },
  date: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(50, 50, 50, 1)',
  },
});
