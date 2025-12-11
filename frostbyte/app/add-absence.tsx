import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DateSelect } from '@/components/absence/date-select';
import { AbsenceReasonSelect } from '@/components/absence/absence-reason-select';
import { RegisterButton } from '@/components/absence/register-button';
import { RegisterHeader } from '@/components/absence/register-header';
import { ChildSelect } from '@/components/absence/child-select';

export default function AddAbsenceScreen() {
  return (
    <View style={styles.container}>
      <RegisterHeader />

      {/* Child Select */}
      <View style={styles.selectorWrapper}>
        <Text style={styles.label}>
          Barn
          <Text style={styles.asterisk}>*</Text>
        </Text>
        <ChildSelect />
      </View>

      {/* Date Selects */}
      <View style={styles.selectorWrapper}>
        <Text style={styles.label}>
          Periode
          <Text style={styles.asterisk}>*</Text>
        </Text>
        <View style={styles.dateContainer}>
          <View style={styles.dateWrapper}>
            <DateSelect />
          </View>
          <Text style={styles.dash}>-</Text>
          <View style={styles.dateWrapper}>
            <DateSelect />
          </View>
        </View>
      </View>

      {/* Absence Reason Select */}
      <View style={styles.selectorWrapper}>
        <Text style={styles.label}>
          Årsak
          <Text style={styles.asterisk}>*</Text>
        </Text>
        <AbsenceReasonSelect />
      </View>

      <RegisterButton />
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
    maxWidth: 500, // Aligns all selectors on large screens
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
  dateWrapper: {
    flex: 1, // Each date takes equal width
  },
  dash: {
    fontSize: 28,
    fontWeight: '500',
    color: 'black',
    marginHorizontal: 8,
    textAlign: 'center',
  },
});
