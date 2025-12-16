import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface AbsenceCardProps {
  name: string;
  onCancel: () => void;
  onRegister: () => void;
}

const AbsenceCard: React.FC<AbsenceCardProps> = ({
  name,
  onCancel,
  onRegister,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Vil du registrere fravær for</Text>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.cancelText}>Nei, avbryt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={onRegister}
        >
          
          <Text style={styles.registerText}>Registrer fravær</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AbsenceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F7F7F7",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: 280,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
  },
  button: {
    width: "50%",
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    marginRight: 2,
  },
  registerButton: {
    backgroundColor: "#F50000",
    marginLeft: 2,
  },
  cancelText: {
    color: "#000",
    fontWeight: "500",
  },
  registerText: {
    color: "#fff",
    fontWeight: "500",
  },
});
