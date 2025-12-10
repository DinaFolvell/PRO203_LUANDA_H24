// components/absence/absence-grid.tsx
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

interface AbsenceGridProps {
  childId: string;
  startDay: number;
  absences: number[];
  onToggleAbsence: (childId: string, date: number) => void;
}

export function AbsenceGrid({ childId, startDay, absences, onToggleAbsence }: AbsenceGridProps) {
  const dates = Array.from({ length: 7 }, (_, i) => startDay + i);

  return (
    <View style={styles.container}>
      {dates.map((date) => {
        const isAbsent = absences.includes(date);
        return (
          <TouchableOpacity
            key={`${childId}-${date}`}
            style={[styles.cell, isAbsent && styles.absentCell]}
            onPress={() => onToggleAbsence(childId, date)}
          >
            {isAbsent && <Text style={styles.absentIcon}>✗</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  cell: {
    flex: 1,
    height: '100%', // fill parent row height
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(224, 224, 224, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  absentCell: {
    backgroundColor: 'rgba(255, 235, 238, 1)',
  },
  absentIcon: {
    fontSize: 24,
    color: 'rgba(211, 47, 47, 1)',
    fontWeight: '700',
  },
});
