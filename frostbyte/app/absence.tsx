import { View, StyleSheet, ScrollView } from 'react-native';
import { HeaderBar } from '@/components/absence/header-bar';
import { DayRow } from '@/components/absence/day-row';
import { ChildrenColumn } from '@/components/absence/children-column';
import { useState } from 'react';
import { FloatingAddButton } from '@/components/absence/floating-add-button';

export default function AbsenceScreen() {
  const [startDay, setStartDay] = useState(22);
  const [week, setWeek] = useState(25);
  const [absences, setAbsences] = useState<Record<string, number[]>>({});

  const handleToggleAbsence = (childId: string, date: number) => {
    console.log(`Clicked child ${childId} on day ${date}`);
  };

  const handleNextWeek = () => {
    setWeek(prev => (prev === 52 ? 1 : prev + 1));
    setStartDay(prev => {
      const next = prev + 7;
      return next > 31 ? ((next - 1) % 31) + 1 : next;
    });
  };

  const handlePrevWeek = () => {
    setWeek(prev => (prev === 1 ? 52 : prev - 1));
    setStartDay(prev => {
      const next = prev - 7;
      return next < 1 ? 31 - ((1 - next) % 31) : next;
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        week={week}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onNotifications={() => console.log('Notification bell clicked')}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <DayRow startDay={startDay} />
          <ScrollView style={{ maxHeight: '100%' }}>
            <ChildrenColumn
              startDay={startDay}
              absences={absences}
              onToggleAbsence={handleToggleAbsence}
            />
          </ScrollView>
        </View>
      </ScrollView>

      <FloatingAddButton style={styles.addButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  addButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    zIndex: 100,
  },
});
