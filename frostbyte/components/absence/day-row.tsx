import { StyleSheet, View } from 'react-native';
import { DayCell } from './day-cell';

export interface DayRowProps {
  startDay: number;
}

export function DayRow({ startDay }: DayRowProps) {
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Generate day data for the week
  const days = Array.from({ length: 7 }, (_, i) => ({
    dayName: dayNames[i],
    date: startDay + i
  }));

  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <DayCell
          key={`day-cell-${index}`}
          days={[day]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(224, 224, 224, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: 90,
  },
});