// app/authentication.tsx
import { useAuthSession } from "@/providers/authctx";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Authentication = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const { signIn, createUser } = useAuthSession();

  const handleSubmit = () => {
    if (!userEmail || !password || (isSignUp && !userName)) {
      // her kan du evt vise en feilmelding
      return;
    }

    if (isSignUp) {
      createUser(userEmail, password, userName);
    } else {
      signIn(userEmail, password);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-50}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.mainContainer}>
          {isSignUp && (
            <View style={styles.textFieldContainer}>
              <Text>Brukernavn</Text>
              <TextInput
                value={userName}
                onChangeText={setUserName}
                style={styles.textField}
                placeholder="Brukernavn"
              />
            </View>
          )}
          <View style={styles.textFieldContainer}>
            <Text>E-post</Text>
            <TextInput
              value={userEmail}
              onChangeText={setUserEmail}
              style={styles.textField}
              placeholder="E-post"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.textFieldContainer}>
            <Text>Passord</Text>
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              style={styles.textField}
              placeholder="Passord"
            />
          </View>

          <Pressable
            style={{ paddingTop: 24 }}
            onPress={() => setIsSignUp(!isSignUp)}
          >
          </Pressable>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.primaryButton} onPress={handleSubmit}>
              <Text style={{ color: "white" }}>
                {isSignUp ? "Lag bruker" : "Logg inn"}
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  primaryButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: "#0096C7",
  },
  textFieldContainer: {
    width: "100%",
    paddingTop: 16,
  },
  textField: {
    borderWidth: 1,
    padding: 10,
    marginTop: 2,
    borderColor: "gray",
    borderRadius: 5,
  },
});
