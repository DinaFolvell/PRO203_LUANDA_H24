import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { signIn } from "@/api/authApi";
import { router } from "expo-router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const user = await signIn(username, password);

      if (user) {
        router.push(
          "/dashboard"
        );
      }
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
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

        <View>
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
              {visibleButtons.absence && (
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

        <View>
          <NotificationsOverview notifications={mockNotifications} />
        </View>
      </View>
    </ScrollView>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.loginContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Bapa - ansatt</Text>
        <Text style={styles.subtitle}>Logg inn med din bruker-ID</Text>
        <Text>Brukernavn: 123@mail.no</Text>
        <Text>Passord: passord123</Text>
        <Text />

        <TextInput
          style={styles.input}
          placeholder="Bruker-ID"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
   shortcutsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  loginContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    color: "#f54500",
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#f54500",
    fontSize: 16,
    fontWeight: "600",
  },
});
