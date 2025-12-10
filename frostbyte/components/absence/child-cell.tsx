// components/absence/child-cell.tsx
import { StyleSheet, View, Text, Image } from 'react-native';
import { AbsenceGrid } from './absence-grid';

interface ChildCellProps {
  id: string;
  name: string;
  image: { uri: string; width: number; height: number };
  startDay: number;
  absences: number[];
  onToggleAbsence: (childId: string, date: number) => void;
}

export function ChildCell({
  id,
  name,
  image,
  startDay,
  absences,
  onToggleAbsence,
}: ChildCellProps) {
  return (
    <View style={styles.container}>
      <View style={styles.childInfo}>
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
        />
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.gridWrapper}>
        <AbsenceGrid
          childId={id}
          startDay={startDay}
          absences={absences}
          onToggleAbsence={onToggleAbsence}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(224, 224, 224, 1)',
    height: 80, // fixed row height
  },
  childInfo: {
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'rgba(250, 250, 250, 1)',
    height: '100%',
  },
  image: {
    width: 48, // scale down to fit 80px row
    height: 48,
    borderRadius: 24, // optional: circular
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    flexShrink: 1,
  },
  gridWrapper: {
    flex: 1, // take up remaining space for the grid
    justifyContent: 'center', // vertically center the grid inside the row
  },
});
