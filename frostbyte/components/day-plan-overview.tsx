import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const ROW_HEIGHT = 80;              // height per hour row
const EVENT_VERTICAL_GAP = 8;       // gap between events in pixels

const hours = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00",
  "20:00", "21:00", "22:00", "23:00", "00:00",
];

const TOTAL_HEIGHT = hours.length * ROW_HEIGHT;

export default function DayPlanOverview() {
  // Event data (can come from API later)
  const events = [
    {
      start: "08:00",
      end: "09:00",
      title: "Innsjekk",
      subtitle: "Sjekk inn alle barna",
      color: "#D6ECDA", // light green
    },
    {
      start: "09:00",
      end: "12:00",
      title: "Formiddagsaktivitet",
      subtitle: "Lek og aktiviteter inne / ute",
      color: "#FFD0FB", // pink
    },
    {
      start: "12:00",
      end: "13:00",
      title: "Julelunsj",
      subtitle: "Vi serverer risgrøt med saft",
      color: "#FFE4C4", // light orange
    },
    {
      start: "14:00",
      end: "16:00",
      title: "Tur til Lekang",
      subtitle: "Vi planlegger å være tilbake kl 16:00",
      color: "#D0E8FF", // light blue
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.timelineRow}>
          {/* LEFT: time labels */}
          <View style={styles.timeColumn}>
            {hours.map((hour) => (
              <View key={hour} style={styles.timeRow}>
                <Text style={styles.timeText}>{hour}</Text>
              </View>
            ))}
          </View>

          {/* RIGHT: schedule with absolutely positioned events */}
          <View style={styles.scheduleColumn}>
            <View style={{ height: TOTAL_HEIGHT }}>
              {/* Optional subtle hour lines */}
              {hours.map((hour, index) => (
                <View
                  key={`line-${hour}`}
                  style={[
                    styles.hourLine,
                    { top: index * ROW_HEIGHT },
                  ]}
                />
              ))}

              {/* Events */}
              {events.map((event) => {
  const startIndex = hours.indexOf(event.start);
  const endIndex = hours.indexOf(event.end);

  if (startIndex === -1 || endIndex === -1) return null;
  if (endIndex <= startIndex) return null;

  const durationRows = endIndex - startIndex;

  const top = startIndex * ROW_HEIGHT + EVENT_VERTICAL_GAP / 2;
  const height = durationRows * ROW_HEIGHT - EVENT_VERTICAL_GAP;

  return (
    <View
      key={`${event.title}-${event.start}`}
      style={[
        styles.eventCard,
        {
          top,
          height,

          // subtle background tint (optional)
          backgroundColor: event.color + "70",

          // LEFT COLOR BAR
          borderLeftColor: event.color,
          borderLeftWidth: 12,
        },
      ]}
    >
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
    </View>
  );
})}

            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scroll: {
    flex: 1,
  },
  timelineRow: {
    flexDirection: "row",
  },

  // LEFT: time labels
  timeColumn: {
    width: 70,
    paddingRight: 10,
  },
  timeRow: {
    height: ROW_HEIGHT,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  timeText: {
    fontSize: 18,
    color: "#444",
  },

  // RIGHT: schedule area
  scheduleColumn: {
    flex: 1,
    paddingRight: 16,
    position: "relative",
  },

  // faint horizontal lines per hour
  hourLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#eee",
  },

  eventCard: {
    position: "absolute",
    left: 0,
    right: 0,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",
  },
  eventTitle: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
    color: "#111",
  },
  eventSubtitle: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#333",
  },
});
