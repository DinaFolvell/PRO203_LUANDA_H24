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

        

        <View>
            <RegisterHeader />

            <View style={styles.selectorContainer}>
                <Text style={styles.label}>
                Barn
                <Text style={styles.asterisk}>*</Text>
                </Text>
                <ChildSelect />
            </View>

            <View style={styles.selectorContainer}>
                <Text style={styles.label}>
                Periode
                <Text style={styles.asterisk}>*</Text>
                </Text>
                <DateSelect />
                <DateSelect />
            </View>

            <View style={styles.selectorContainer}>
                <Text style={styles.label}>
                Årsak
                <Text style={styles.asterisk}>*</Text>
                </Text>
                <AbsenceReasonSelect />
            </View>
        </View>

        <RegisterButton />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 32,
    paddingBottom: 64,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  selectorContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 8,
    columnGap: 8,
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  label: {
    alignSelf: 'stretch',
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 22,
  },
  asterisk: {
    color: 'rgba(245, 69, 0, 1)',
  },
  selectionBox: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#fff',
  },
  selectionText: {
    color: 'grey',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
  },
});
