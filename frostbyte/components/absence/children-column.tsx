// components/absence/children-column.tsx
import { ScrollView, View } from 'react-native';
import { ChildCell } from './child-cell';
import { ChildService } from '@/services/childService';

interface ChildrenColumnProps {
  startDay: number;
  absences: Record<string, number[]>;
  onToggleAbsence: (childId: string, date: number) => void;
}

export function ChildrenColumn({ startDay, absences, onToggleAbsence }: ChildrenColumnProps) {
  const children = ChildService.getAllChildren();

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        {children.map((child) => (
          <ChildCell 
            key={child.id}
            id={child.id}
            name={child.name} 
            image={child.image}
            startDay={startDay}
            absences={absences[child.id] || []}
            onToggleAbsence={onToggleAbsence}
          />
        ))}
      </View>
    </ScrollView>
  );
}