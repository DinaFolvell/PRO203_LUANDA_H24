import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { DateSelect } from '@/components/absence/date-select';
import { AbsenceReasonSelect } from '@/components/absence/absence-reason-select';
import { RegisterButton } from '@/components/absence/register-button';
import { RegisterHeader } from '@/components/absence/register-header';
import { ChildSelect } from '@/components/absence/child-select';
import { AbsenceService } from '@/services/absenceService';

export default function AddAbsenceScreen() {
  const [selectedChild, setSelectedChild] = useState<null | { id: string; name: string }>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedReason, setSelectedReason] = useState<null | { id: string; reason: string }>(null);
  const [comment, setComment] = useState('');

  const allRequiredFilled = selectedChild && startDate && endDate && selectedReason;

  const handleRegister = () => {
    if (!allRequiredFilled) return;

    const newAbsence = {
      child: selectedChild!,
      startDate: startDate!,
      endDate: endDate!,
      reason: selectedReason!,
      comment,
    };

    AbsenceService.addAbsence(newAbsence);

    setSelectedChild(null);
    setStartDate(null);
    setEndDate(null);
    setSelectedReason(null);
    setComment('');
  };

  return (
    <View style={styles.container}>
      <RegisterHeader />

      <View style={styles.selectorWrapper}>
        <Text style={styles.label}>
          Barn<Text style={styles.asterisk}>*</Text>
        </Text>
        <ChildSelect onSelect={setSelectedChild} />
      </View>

      <View style={styles.selectorWrapper}>
        <Text style={styles.label}>
          Periode<Text style={styles.asterisk}>*</Text>
        </Text>
        <View style={styles.dateContainer}>
          <View style={styles.dateWrapper}>
            <DateSelect onDateChange={setStartDate} />
          </View>
          <Text style={styles.dash}>-</Text>
          <View style={styles.dateWrapper}>
            <DateSelect onDateChange={setEndDate} />
          </View>
        </View>
      </View>

      <View style={styles.selectorWrapper}>
        <Text style={styles.label}>
          Årsak<Text style={styles.asterisk}>*</Text>
        </Text>
        <AbsenceReasonSelect onSelect={setSelectedReason} />
      </View>

      <View style={styles.selectorWrapper}>
        <Text style={styles.label}>Kommentar</Text>
        <TextInput
          style={styles.input}
          placeholder="Skriv her..."
          value={comment}
          onChangeText={setComment}
        />
      </View>

      <RegisterButton
        style={{
          opacity: allRequiredFilled ? 1 : 0.4,
          backgroundColor: allRequiredFilled ? 'rgba(245,69,0,1)' : 'grey',
        }}
        onPress={handleRegister}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingBottom: 64,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorWrapper: {
    width: '100%',
    maxWidth: 500,
    marginBottom: 32,
  },
  label: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  asterisk: {
    color: 'rgba(245,69,0,1)',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  dateWrapper: { flex: 1 },
  dash: {
    fontSize: 28,
    fontWeight: '500',
    color: 'black',
    marginHorizontal: 8,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 6,
    backgroundColor: 'white',
    fontSize: 16,
    color: '#333',
  },
});
