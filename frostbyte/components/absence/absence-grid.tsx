import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AbsenceRecord } from '@/services/absenceService';

interface AbsenceGridProps {
  childId: string;
  weekDates: Date[];
  absences: AbsenceRecord[];
  onToggleAbsence: (childId: string, date: Date) => void;
}

function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isDateInRange(checkDate: Date, startDate: Date, endDate: Date): boolean {
  const normalized = normalizeDate(checkDate).getTime();
  const start = normalizeDate(startDate).getTime();
  const end = normalizeDate(endDate).getTime();
  
  return normalized >= start && normalized <= end;
}

export function AbsenceGrid({ childId, weekDates, absences, onToggleAbsence }: AbsenceGridProps) {
  return (
    <View style={styles.container}>
      {weekDates.map(date => {
        const hasAbsence = absences.some(
          a => a.child.id === childId && isDateInRange(date, a.startDate, a.endDate)
        );

        return (
          <TouchableOpacity
            key={`${childId}-${date.toDateString()}`}
            style={[styles.cell, hasAbsence && styles.absenceCell]}
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
  absenceCell: {
    backgroundColor: 'rgba(245,69,0,0.6)',
  },
});