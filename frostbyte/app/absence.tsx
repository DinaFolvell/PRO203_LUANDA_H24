import { View, StyleSheet, ScrollView } from 'react-native';
import { HeaderBar } from '@/components/absence/header-bar';
import { DayRow } from '@/components/absence/day-row';
import { ChildrenColumn } from '@/components/absence/children-column';
import { useState } from 'react';

export default function AbsenceScreen() {
  const [startDay, setStartDay] = useState(22);
  const [absences, setAbsences] = useState<Record<string, number[]>>({});

  const handleToggleAbsence = (childId: string, date: number) => {
    setAbsences(prev => {
      const childAbsences = prev[childId] || [];
      const isAbsent = childAbsences.includes(date);

      return {
        ...prev,
        [childId]: isAbsent
          ? childAbsences.filter(d => d !== date)
          : [...childAbsences, date]
      };
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        onPrevWeek={() => setStartDay(prev => prev - 7)}
        onNextWeek={() => setStartDay(prev => prev + 7)}
        onNotifications={() => console.log('Notification bell clicked')}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <DayRow startDay={startDay} />
          <ScrollView style={{ maxHeight: '80%' }}>
            <ChildrenColumn
              startDay={startDay}
              absences={absences}
              onToggleAbsence={handleToggleAbsence}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});
