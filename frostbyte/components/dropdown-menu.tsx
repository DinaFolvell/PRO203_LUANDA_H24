import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from "react-native";

type StatusKey = "tilstede" | "forventet" | "hentet";

type AttendanceOption = {
  key: StatusKey;
  label: string;
  value: number;
  image: ImageSourcePropType;
};

const attendance: AttendanceOption[] = [
  { 
    key: "forventet",
    image: require("../assets/icons/yellow-expected-icon.png"),
    label: "Forventet", 
    value: 1, 
  },
  { 
    key: "tilstede",
    image: require("../assets/icons/green-present-icon.png"),
    label: "Tilstede", 
    value: 2, 
  },
  { 
    key: "hentet",
    image: require("../assets/icons/purple-picked-up-icon.png"),
    label: "Hentet",
    value: 3, 
  }
];

const statusColors: Record<
  StatusKey,
  { background: string; text: string }
> = {
  tilstede: {
    background: "#496F57",
    text: "#FFFFFF",
  },
  forventet: {
    background: "#C28E00",
    text: "#FFFFFF",
  },
  hentet: {
    background: "#75339B",
    text: "#FFFFFF",
  },
};

export default function AttendanceDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<AttendanceOption>(attendance[0]);

  const colors = statusColors[selected.key];

  const handleSelect = (option: AttendanceOption) => {
    setSelected(option);
    setIsOpen(false);
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => setIsOpen((prev) => !prev)}
        style={[
          styles.button,
          {
            backgroundColor: colors.background
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>
          {selected.label}
        </Text>
        <Text style={[styles.arrow, { color: colors.text }]}>
          {isOpen ? "˄" : "˅"}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          {attendance.map((option) => {
            const isSelected = option.value === selected.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={styles.optionRow}
                onPress={() => handleSelect(option)}
                activeOpacity={0.8}
              >
                <Image source={option.image} style={styles.icon} />
                <Text
                  style={[
                    styles.optionLabel,
                    isSelected && styles.optionLabelSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 140,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  arrow: {
    fontSize: 14,
    marginLeft: 8,
  },
  dropdown: {
    marginTop: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: "contain",
  },
  optionLabel: {
    fontSize: 14,
    color: "#333333",
  },
  optionLabelSelected: {
    fontWeight: "600",
  },
});
