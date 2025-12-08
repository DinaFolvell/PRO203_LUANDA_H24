import AttendanceCard from "@/components/attendance-card";
import { AttendanceOverview } from "@/components/attendance-overview";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";

import AllScreen from "../attendance-screens/all-screen";
import PresentScreen from "../attendance-screens/present-screen";
import ExpectedScreen from "../attendance-screens/expected-screen";
import PickedUpScreen from "../attendance-screens/picked-up-screen";
import AbsentScreen from "../attendance-screens/absent-screen";
import { HorizontalChildCard } from "../components/horizontal-child-card";

export default function CheckInScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderSubpage = () => {
    switch (activeIndex) {
      case 0:
        return <AllScreen />;
      case 1:
        return <PresentScreen />;
      case 2:
        return <ExpectedScreen />;
      case 3:
        return <PickedUpScreen />;
      case 4:
        return <AbsentScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <AttendanceOverview
        activeIndex={activeIndex}
        onIndexChange={setActiveIndex}
      />
      <ScrollView contentContainerStyle={styles.subpageWrapper}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          {renderSubpage()}
        </TouchableOpacity>
      </ScrollView>
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <AttendanceCard
              photoUrl={require("../assets/images/dina.png")}
              name="Dina Folvell"
              note="Kommer 09:30 og blir hentet tidlig"
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <View>
        <HorizontalChildCard
          name="Dina Folvell"
          image={require("../assets/images/dina.png")}
          attendanceStatus="present"
          style={styles.childCard}
        />
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


  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
  },
});

/**
 *  
 */