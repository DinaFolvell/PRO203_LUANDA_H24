import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseEnv";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { Platform } from "react-native";

const app = initializeApp(firebaseConfig);

let persistence;

// Use browser persistence on web
if (Platform.OS === "web") {
  persistence = browserLocalPersistence;
} else {
  // Load only on real mobile platforms
  const AsyncStorage =
    require("@react-native-async-storage/async-storage").default;
  persistence = getReactNativePersistence(AsyncStorage);
}

// Initialize auth with correct persistence
export const auth = initializeAuth(app, { persistence });

// Firestore
export const db = getFirestore(app);
