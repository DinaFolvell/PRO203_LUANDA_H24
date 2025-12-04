import { AttendanceOverview } from '@/components/attendance-overview';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import AllScreen from '../attendance-screens/all-screen';
import PresentScreen from '../attendance-screens/present-screen';
import ExpectedScreen from '../attendance-screens/expected-screen';
import PickedUpScreen from '../attendance-screens/picked-up-screen';
import AbsentScreen from '../attendance-screens/absent-screen';

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
      
      <View style={styles.subpageWrapper}>
        {renderSubpage()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  subpageWrapper: {
    flex: 1,
  },
});
