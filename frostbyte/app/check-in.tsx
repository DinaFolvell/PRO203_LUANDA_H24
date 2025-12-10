import AttendanceCard from "../components/check-in/attendance-card";
import { AttendanceOverview } from "../components/check-in/attendance-overview";
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";

import AllScreen from "../components/check-in/tabs/all-tab";
import PresentScreen from "../components/check-in/tabs/present-tab";
import ExpectedScreen from "../components/check-in/tabs/expected-tab";
import PickedUpScreen from "../components/check-in/tabs/picked-up-tab";
import AbsentScreen from "../components/check-in/tabs/absent-tab";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CheckInScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const isHorizontalSwipe = Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        const hasMovedEnough = Math.abs(gestureState.dx) > 10;
        return isHorizontalSwipe && hasMovedEnough;
      },
      onPanResponderGrant: () => {
        setScrollEnabled(false);
      },
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        setScrollEnabled(true);
        const { dx } = gestureState;
        const currentIndex = activeIndexRef.current;
        
        if (dx > 80 && currentIndex > 0) {
          goToPage(currentIndex - 1);
        } 
        else if (dx < -80 && currentIndex < 4) {
          goToPage(currentIndex + 1);
        } else {
          resetPosition();
        }
      },
      onPanResponderTerminate: () => {
        setScrollEnabled(true);
        resetPosition();
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      friction: 7,
    }).start();
  };

  const goToPage = (newIndex: number) => {
    const direction = newIndex > activeIndexRef.current ? -1 : 1;
    Animated.timing(translateX, {
      toValue: direction * SCREEN_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      translateX.setValue(0);
      setActiveIndex(newIndex);
      activeIndexRef.current = newIndex;
    });
  };

  const handleTabChange = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    goToPage(newIndex);
  };

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
        onIndexChange={handleTabChange}
      />
      <Animated.View
        style={[
          styles.contentContainer,
          {
            transform: [{ translateX }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <ScrollView
          contentContainerStyle={styles.subpageWrapper}
          scrollEnabled={scrollEnabled}
        >
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            {renderSubpage()}
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFE3F4",
  },
  childCard: {
    marginVertical: 10,
  },
  contentContainer: {
    flex: 1,
  },
  subpageWrapper: {
    flexGrow: 1,
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