import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AbsenceButton } from "@/components/absence-button";
import { AttendanceButton } from "@/components/attendance-button";
import { CareButton } from "@/components/care-button";
import DayPlanOverview from "@/components/day-plan-overview";
import { MessagesButton } from "@/components/messages-button";
import {
  NotificationsOverview,
  mockNotifications,
} from "@/components/notifications-overview";

const buttonLabels = {
  attendance: "Oppmøte",
  absence: "Fravær",
  care: "Pleie",
  messages: "Meldinger",
};

const screenHeight = Dimensions.get("window").height;
const maxSectionHeight = screenHeight / 3;

export default function HomeScreen() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [visibleButtons, setVisibleButtons] = useState({
    attendance: true,
    absence: true,
    care: true,
    messages: true,
  });

  const handleEditPress = () => {
    setIsEditMode(!isEditMode);
  };

  const toggleButton = (buttonKey: keyof typeof visibleButtons) => {
    if (isEditMode) {
      setVisibleButtons((prev) => ({
        ...prev,
        [buttonKey]: !prev[buttonKey],
      }));
    }
  };

  const hiddenButtons = Object.entries(visibleButtons)
    .filter(([_, isVisible]) => !isVisible)
    .map(([key]) => key as keyof typeof visibleButtons);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>

        <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10,}}>
            Dagsplan
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "300", marginBottom: 10 }}>
            onsdag 3.desember 2025
          </Text>
        </View>
        
        <View style={[styles.dayPlanBox, { maxHeight: maxSectionHeight }]}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
          >
            <DayPlanOverview />
          </ScrollView>
          
        </View>


        <View style={styles.shortcutsBox}>
          <View style={styles.shortcutsHeader}>
            <Text style={styles.shortcutsTitle}>Snarveier</Text>
            <TouchableOpacity
              onPress={handleEditPress}
              style={styles.editButton}
            >
              <MaterialCommunityIcons
                name={isEditMode ? "check" : "square-edit-outline"}
                size={24}
                color="rgba(245, 69, 0, 1)"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              {visibleButtons.attendance && (
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    onPress={() => toggleButton("attendance")}
                    disabled={!isEditMode}
                    style={styles.buttonTouchable}
                  >
                    <AttendanceButton />
                    {isEditMode && (
                      <View style={styles.removeIcon}>
                        <MaterialCommunityIcons
                          name="close-circle"
                          size={28}
                          color="#FF3B30"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              )}
              {visibleButtons.absence && (
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    onPress={() => toggleButton("absence")}
                    disabled={!isEditMode}
                    style={styles.buttonTouchable}
                  >
                    <AbsenceButton />
                    {isEditMode && (
                      <View style={styles.removeIcon}>
                        <MaterialCommunityIcons
                          name="close-circle"
                          size={28}
                          color="#FF3B30"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.buttonRow}>
              {visibleButtons.care && (
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    onPress={() => toggleButton("care")}
                    disabled={!isEditMode}
                    style={styles.buttonTouchable}
                  >
                    <CareButton />
                    {isEditMode && (
                      <View style={styles.removeIcon}>
                        <MaterialCommunityIcons
                          name="close-circle"
                          size={28}
                          color="#FF3B30"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              )}
              {visibleButtons.messages && (
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    onPress={() => toggleButton("messages")}
                    disabled={!isEditMode}
                    style={styles.buttonTouchable}
                  >
                    <MessagesButton />
                    {isEditMode && (
                      <View style={styles.removeIcon}>
                        <MaterialCommunityIcons
                          name="close-circle"
                          size={28}
                          color="#FF3B30"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {isEditMode && hiddenButtons.length > 0 && (
              <View style={styles.hiddenButtonsSection}>
                <Text style={styles.hiddenButtonsTitle}>
                  Legg til snarveier:
                </Text>
                <View style={styles.hiddenButtonsList}>
                  {hiddenButtons.map((buttonKey) => (
                    <TouchableOpacity
                      key={buttonKey}
                      onPress={() => toggleButton(buttonKey)}
                      style={styles.addButton}
                    >
                      <MaterialCommunityIcons
                        name="plus-circle"
                        size={20}
                        color="rgba(245, 69, 0, 1)"
                      />
                      <Text style={styles.addButtonText}>
                        {buttonLabels[buttonKey]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>


        <View
          style={[
            styles.notificationsContainer,
            { maxHeight: maxSectionHeight },
          ]}
        >
            <NotificationsOverview notifications={mockNotifications} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  container: {
    padding: 16,
  },

  dayPlanBox: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    shadowColor: "rgba(0,0,0,0.15)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
  },

  shortcutsBox: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    shadowColor: "rgba(0,0,0,0.15)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
  },

  shortcutsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  shortcutsTitle: {
    fontSize: 23,
    fontWeight: "700",
    textAlign: "left",
  },

  editButton: {
    padding: 4,
  },

  buttonContainer: {
    marginTop: 20,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },

  buttonWrapper: {
    flex: 1,
    paddingHorizontal: 8,
  },

  buttonTouchable: {
    position: "relative",
  },

  removeIcon: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "white",
    borderRadius: 14,
  },

  hiddenButtonsSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },

  hiddenButtonsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },

  hiddenButtonsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(245, 69, 0, 0.3)",
    gap: 6,
  },

  addButtonText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },

  notificationsContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "rgba(0,0,0,0.15)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
    padding: 20,
  },
});
