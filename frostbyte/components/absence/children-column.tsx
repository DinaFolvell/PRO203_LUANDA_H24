import { View } from 'react-native';
import { ChildCell } from './child-cell';
import { ChildService } from '@/services/childService';
import { AbsenceRecord } from '@/services/absenceService';

interface ChildrenColumnProps {
  weekDates: Date[];
  absences: AbsenceRecord[];
  onToggleAbsence: (childId: string, date: Date) => void;
}

export function ChildrenColumn({ weekDates, absences, onToggleAbsence }: ChildrenColumnProps) {
  const children = ChildService.getAllChildren();

  return (
    <View>
      {children.map(child => {
        const childAbsences = absences.filter(a => a.child.id === child.id);

        return (
          <ChildCell
            key={child.id}
            id={child.id}
            name={child.name}
            image={child.image}
            weekDates={weekDates}
            absences={childAbsences}
            onToggleAbsence={onToggleAbsence}
          />
        );
      })}
    </View>
  );
}
