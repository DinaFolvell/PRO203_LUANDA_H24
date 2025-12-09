import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from "react-native";
import Feather from '@expo/vector-icons/Feather';

export type StatusKey = "present" | "expected" | "picked_up" | "absent";

type AttendanceOption = {
  key: StatusKey;
  label: string;
  value: number;
  image: ImageSourcePropType;
};

const attendance: AttendanceOption[] = [
  { 
    key: "expected",
    image: require("../assets/icons/yellow-expected-icon.png"),
    label: "Forventet", 
    value: 1, 
  },
  { 
    key: "present",
    image: require("../assets/icons/green-present-icon.png"),
    label: "Tilstede", 
    value: 2, 
  },
  { 
    key: "picked_up",
    image: require("../assets/icons/purple-picked-up-icon.png"),
    label: "Hentet",
    value: 3, 
  },
  { 
    key: "absent",
    image: require("../assets/icons/red-absent-icon.png"),
    label: "Fravær",
    value: 4, 
  }
];

const statusColors: Record<
  StatusKey,
  { background: string; text: string }
> = {
  present: {
    background: "#496F57",
    text: "#FFFFFF",
  },
  expected: {
    background: "#C28E00",
    text: "#FFFFFF",
  },
  picked_up: {
    background: "#75339B",
    text: "#FFFFFF",
  },
  absent: {
    background: "#F50000",
    text: "#FFFFFF",
  },
};

type AttendanceDropdownProps = {
  initialStatus?: StatusKey;
  onChange?: (status: StatusKey) => void;
  onOpen?: () => void;
  onClose?: () => void;
};

export default function AttendanceDropdown({
    initialStatus = "expected",
    onChange,
    onOpen,
    onClose,
  }: AttendanceDropdownProps) {
  
    const [isOpen, setIsOpen] = useState(false);

    const [selected, setSelected] = useState<AttendanceOption>(
      attendance.find((opt) => opt.key === initialStatus) ?? attendance[1]
  );

  const colors = statusColors[selected.key];

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        onOpen?.();
      } else {
        onClose?.();
      }
      return next;
    });
  };

  const handleSelect = (option: AttendanceOption) => {
    setSelected(option);         
    onChange?.(option.key);      
    setIsOpen(false);
    onClose?.();             
  };

  return (
    <View style={[styles.container, isOpen && styles.containerOpen]}>
      <TouchableOpacity
        onPress={toggleOpen} 
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
          {isOpen ? (
            <Feather name="chevron-up" size={20} color={colors.text} />
            ) : (
            <Feather name="chevron-down" size={20} color={colors.text} />
          )}
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
  container: {
    width: 140,
    position: "relative",
  },
  containerOpen: {
    zIndex: 1000,
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
    position: "absolute",
    top: 40,                
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    zIndex: 2000,
    elevation: 5,
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
