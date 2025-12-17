import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert, Platform } from "react-native";

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    if (Platform.OS === "web") {
      alert("Feil brukernavn eller passord");
    } else {
      Alert.alert("Feil brukernavn eller passord");
    }
    throw error;
  }
}
