import AttendanceCard from "@/components/attendance-card";
import { AttendanceOverview } from "@/components/attendance-overview";
import React, { useState, useRef, useEffect } from "react";
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

import AllScreen from "../components/attendance-screens/all-screen";
import PresentScreen from "../components/attendance-screens/present-screen";
import ExpectedScreen from "../components/attendance-screens/expected-screen";
import PickedUpScreen from "../components/attendance-screens/picked-up-screen";
import AbsentScreen from "../components/attendance-screens/absent-screen";

import { Child, AttendanceStatus } from "@/api/childApi";
import { ChildService } from "@/api/childApi";
import { imageMap } from "@/assets/images/imageMap";

import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function CheckInScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const translateX = useRef(new Animated.Value(0)).current;

  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "childData"),
      (snapshot) => {
        const liveChildren = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Child)
        );
        setChildren(liveChildren);
      },
      (error) => {
        console.error("Realtime error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (
    childId: string,
    status: AttendanceStatus
  ) => {
    await ChildService.updateChildAttendance(childId, status);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const isHorizontalSwipe =
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
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
        } else if (dx < -80 && currentIndex < 4) {
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

  const handleChildPress = (child: Child) => {
    setSelectedChild(child);
    setIsModalVisible(true);
  };

  const renderSubpage = () => {
    const commonProps = {
      data: children,
      onChildPress: handleChildPress,
    };

    switch (activeIndex) {
      case 0:
        return <AllScreen {...commonProps} />;
      case 1:
        return <PresentScreen {...commonProps} />;
      case 2:
        return <ExpectedScreen {...commonProps} />;
      case 3:
        return <PickedUpScreen {...commonProps} />;
      case 4:
        return <AbsentScreen {...commonProps} />;
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
          {renderSubpage()}
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
            {selectedChild && (
              <AttendanceCard
                childId={selectedChild.id}
                photoUrl={imageMap[selectedChild.image]}
                name={selectedChild.name}
                note="Kommer 09:30 og blir hentet tidlig"
                onClose={() => setIsModalVisible(false)}
                onStatusChange={(status) =>
                  handleStatusChange(selectedChild.id, status)
                }
              />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    padding: 10,
    borderRadius: 12,
  },
});
