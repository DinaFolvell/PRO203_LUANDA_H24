import { StyleSheet, View, TouchableOpacity } from 'react-native';

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
      {dates.map(date => {
        return (
          <TouchableOpacity
            key={`${childId}-${date}`}
            style={styles.cell}
            onPress={() => onToggleAbsence(childId, date)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(224, 224, 224, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});
