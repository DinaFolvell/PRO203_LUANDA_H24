import { AttendanceOverview } from '@/components/attendance-overview';
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import AllScreen from '../attendance-screens/all-screen';
import PresentScreen from '../attendance-screens/present-screen';
import ExpectedScreen from '../attendance-screens/expected-screen';
import PickedUpScreen from '../attendance-screens/picked-up-screen';
import AbsentScreen from '../attendance-screens/absent-screen';
import { HorizontalChildCard } from '../components/horizontal-child-card';

export default function CheckInScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderSubpage = () => {
    switch (activeIndex) {
      case 0: return <AllScreen />;
      case 1: return <PresentScreen />;
      case 2: return <ExpectedScreen />;
      case 3: return <PickedUpScreen />;
      case 4: return <AbsentScreen />;
      default: return null;
    }
  };

  return (
    <View style={styles.container}>
      <AttendanceOverview 
        activeIndex={activeIndex}
        onIndexChange={setActiveIndex}
      />

      <HorizontalChildCard
        name="Dina Folvell"
        image={require("../assets/images/dina.png")}
        attendanceStatus="present"
        style={styles.childCard}
      />

      <View style={styles.subpageContainer}>
        <ScrollView contentContainerStyle={styles.subpageWrapper}>
          {renderSubpage()}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#fff",
  },
  childCard: {
    marginVertical: 10,
  },
  subpageContainer: {
    flex: 1,
  },
  subpageWrapper: {
    paddingBottom: 20,
  },
});
