import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ChildSelect } from '@/components/absence/child-select';
import { DateSelect } from '@/components/absence/date-select';
import { AbsenceReasonSelect } from '@/components/absence/absence-reason-select';
import { RegisterButton } from '@/components/absence/register-button';
import { RegisterHeader } from '@/components/absence/register-header';

export default function AddAbsenceScreen() {
    return (
        <View style={styles.container}>
            <RegisterHeader />
            <ChildSelect />
            <DateSelect />
            <DateSelect />
            <AbsenceReasonSelect />
            <RegisterButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 32,
        alignItems: 'center',
    },
});
