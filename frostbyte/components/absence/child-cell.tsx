import { StyleSheet, View, Text, Image } from 'react-native';
import { AbsenceGrid } from './absence-grid';
import { AbsenceRecord } from '@/services/absenceService';

interface ChildCellProps {
  id: string;
  name: string;
  image: { uri: string; width: number; height: number };
  weekDates: Date[];
  absences: AbsenceRecord[];
  onToggleAbsence: (childId: string, date: Date) => void;
}

export function ChildCell({ id, name, image, weekDates, absences, onToggleAbsence }: ChildCellProps) {
  return (
    <View style={styles.container}>
      <View style={styles.childInfo}>
        <Image source={{ uri: image.uri }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
      </View>

      <AbsenceGrid
      childId={id}
      weekDates={weekDates}
      absences={absences}
      onToggleAbsence={onToggleAbsence}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(224, 224, 224, 1)',
  },
  childInfo: {
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'rgba(250, 250, 250, 1)',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    flexShrink: 1,
  },
});
