import { StyleSheet, View, Text } from 'react-native';

export function DayRow({ startDate }: { startDate: Date }) {
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    return d;
  });

  return (
    <View style={styles.container}>
      <View style={styles.childInfoPlaceholder} />
      {weekDates.map((date, index) => (
        <View key={index} style={styles.dayCell}>
          <Text style={styles.dayName}>
            {dayNames[date.getDay() === 0 ? 6 : date.getDay() - 1]}
          </Text>
          <Text style={styles.date}>{date.getDate()}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', height: 80, borderBottomWidth: 1, borderBottomColor: '#e0e0e0', backgroundColor: '#f5f5f5' },
  childInfoPlaceholder: { width: 150 },
  dayCell: { flex: 1, justifyContent: 'center', alignItems: 'flex-start', borderLeftWidth: 1, borderLeftColor: '#e0e0e0', paddingLeft: 8 },
  dayName: { fontWeight: '600', fontSize: 14 },
  date: { fontSize: 20, fontWeight: '700', color: '#323232' },
});
