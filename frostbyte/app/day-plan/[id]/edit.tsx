import { useDayPlan } from "@/context/dayplan-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EditDayPlanScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { events, updateEvent } = useDayPlan();

  const event = events.find((e) => e.id === id);

  const [title, setTitle] = useState(event?.title ?? "");
  const [start, setStart] = useState(event?.start ?? "");
  const [end, setEnd] = useState(event?.end ?? "");
  const [comment, setComment] = useState(event?.description ?? "");
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStart(event.start);
      setEnd(event.end);
      setComment(event.description ?? "");
    }
  }, [event?.id]);

  if (!event) {
    return (
      <View style={styles.center}>
        <Text>Fant ikke aktivitet.</Text>
      </View>
    );
  }

  const handleSave = () => {
    if (!id) return;

    updateEvent(id, {
      title,
      start,
      end,
      description: comment,
    });

    router.push("/dashboard");
  };

  const handleDiscard = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.container}>
        <View
          style={[
            styles.header,
            { backgroundColor: event.color, paddingTop: insets.top },
          ]}
        >
          <TouchableOpacity onPress={() => router.push("/dashboard")}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{event.title}</Text>
          <View style={{ width: 24 }} />
        </View>

        <View className="content" style={styles.content}>
          {/* Tittel */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Tittel</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={styles.textInput}
              placeholder="Tittel"
            />
          </View>

          {/* Tidspunkt */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Tidspunkt</Text>
            <View style={styles.timeRow}>
              <TextInput
                value={start}
                onChangeText={setStart}
                style={[styles.textInput, styles.timeInput]}
                placeholder="00:00"
              />
              <Text style={styles.timeDash}>-</Text>
              <TextInput
                value={end}
                onChangeText={setEnd}
                style={[styles.textInput, styles.timeInput]}
                placeholder="00:00"
              />
            </View>
          </View>

          {/* Kommentar */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Kommentar</Text>
            <TextInput
              value={comment}
              onChangeText={setComment}
              style={styles.commentInput}
              multiline
              textAlignVertical="top"
              placeholder="Skriv en kommentar..."
            />
          </View>
        </View>

        {/* Buttons at bottom */}
        <View
          style={[
            styles.buttonsContainer,
            { paddingBottom: insets.bottom + 16 },
          ]}
        >
          <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
            <Text style={styles.primaryButtonText}>Lagre endringer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setShowDiscardModal(true)}
          >
            <Text style={styles.secondaryButtonText}>Forkast endringer</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showDiscardModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Forkast endringer?</Text>
            <Text style={styles.modalSubtitle}>
              Ved å bekrefte vil alle dine endringer gå tapt
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setShowDiscardModal(false)}
              >
                <Text style={styles.modalCancelText}>Avbryt</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalConfirm}
                onPress={() => router.push("/dashboard")}
              >
                <Text style={styles.modalConfirmText}>Bekreft</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backArrow: {
    fontSize: 22,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  // main content
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  textInput: {
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeInput: {
    flex: 0,
    width: 80,
    textAlign: "center",
  },
  timeDash: {
    marginHorizontal: 8,
    fontSize: 18,
  },

  commentInput: {
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    minHeight: 120,
  },

  // bottom buttons
  buttonsContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: "#f7f7f7",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#e85a1c",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryButton: {
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e85a1c",
  },
  secondaryButtonText: {
    color: "#e85a1c",
    fontWeight: "700",
    fontSize: 16,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  modalBox: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },

  modalSubtitle: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginBottom: 20,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    gap: 12,
  },

  modalCancel: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },

  modalCancelText: {
    color: "#e85a1c",
    fontWeight: "600",
  },

  modalConfirm: {
    flex: 1,
    backgroundColor: "#e85a1c",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },

  modalConfirmText: {
    color: "white",
    fontWeight: "700",
  },
});
