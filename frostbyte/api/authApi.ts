import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
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

export async function signOut() {
  await auth.signOut();
}

export async function createUser(email: string, password: string) {
  console.log("Epost", email);
  console.log("password", password);
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials.user;
  } catch (error) {
    console.error("Oops! kunne ikke opprette bruker", error);
    return null;
  }
}

export async function setUserDisplayName(user: User, displayName: string) {
  try {
    await updateProfile(user, {
      displayName: displayName,
    });
  } catch (error) {
    console.error("Oops! kunne ikke oppdatere display name", error);
  }
}
