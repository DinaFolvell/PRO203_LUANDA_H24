import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface DateSelectProps {
  onDateChange?: (date: Date | null) => void;
}

export function DateSelect({ onDateChange }: DateSelectProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}`;
  };

  const formatDisplayText = () => (!selectedDate ? 'dd/mm' : formatDate(selectedDate));

  const handleDateSelect = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(selected);
  };

  const handleDone = () => {
    if (selectedDate) {
      onDateChange?.(selectedDate);
      setShowCalendar(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.root} onPress={() => setShowCalendar(true)}>
        <Text style={styles.text}>{formatDisplayText()}</Text>
        <MaterialIcons name="calendar-month" size={28} color="#000" />
      </TouchableOpacity>

      {showCalendar && (
        <Modal transparent animationType="fade" onRequestClose={() => setShowCalendar(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.calendarContainer}>
              <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
                <Text style={styles.doneButtonText}>Ferdig</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', maxWidth: 500 },
  root: {
    width: '100%',
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    backgroundColor: 'white',
  },
  text: { color: '#333', fontSize: 18, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  calendarContainer: { backgroundColor: 'white', borderRadius: 12, padding: 20, width: '90%', maxWidth: 400 },
  doneButton: { marginTop: 16, backgroundColor: 'rgba(245,69,0,1)', padding: 12, borderRadius: 8, alignItems: 'center' },
  doneButtonText: { color: 'white', fontSize: 16, fontWeight: '700' },
});
