import { View, StyleSheet, ScrollView } from 'react-native';
import { HeaderBar } from '@/components/absence/overview-header-bar';
import { DayRow } from '@/components/absence/day-row';
import { ChildrenColumn } from '@/components/absence/children-column';
import { useState } from 'react';
import { FloatingAddButton } from '@/components/absence/floating-add-button';
import { AbsenceService, AbsenceRecord } from '@/services/absenceService';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getWeekStart(date: Date) {
  const day = date.getDay(); // Sunday = 0
  const diff = day === 0 ? -6 : 1 - day; // Monday = 1
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  return monday;
}

export default function AbsenceScreen() {
  const [currentWeekDate, setCurrentWeekDate] = useState(new Date());
  const [absences, setAbsences] = useState<AbsenceRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      const allAbsences = AbsenceService.getAllAbsences();
      console.log('Screen focused - loading absences:', allAbsences);
      setAbsences(allAbsences);
    }, [])
  );

  const monday = getWeekStart(currentWeekDate);
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(monday, i));

  const handleToggleAbsence = (childId: string, date: Date) => {
    console.log(`Clicked child ${childId} on ${date.toDateString()}`);
  };

  const handleNextWeek = () => setCurrentWeekDate(prev => addDays(prev, 7));
  const handlePrevWeek = () => setCurrentWeekDate(prev => addDays(prev, -7));

  const getWeekNumber = (date: Date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date.getTime() - start.getTime();
    return Math.ceil((diff / (1000 * 60 * 60 * 24) + start.getDay() + 1) / 7);
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        week={getWeekNumber(currentWeekDate)}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onNotifications={() => console.log('Notification clicked')}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <DayRow startDate={weekDates[0]} />
          <ScrollView style={{ maxHeight: '100%' }}>
            <ChildrenColumn
              weekDates={weekDates}
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
  container: { flex: 1, backgroundColor: '#fff' },
  addButton: { position: 'absolute', bottom: 32, right: 32, zIndex: 100 },
});