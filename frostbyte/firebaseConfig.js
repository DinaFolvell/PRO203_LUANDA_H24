import { initializeApp, getApps, getApp } from "firebase/app";
import firebaseConfig from "./firebaseEnv";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { Platform } from "react-native";

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let persistence;


if (Platform.OS === "web") {
  persistence = browserLocalPersistence;
} else {
  const AsyncStorage =
    require("@react-native-async-storage/async-storage").default;

  persistence = getReactNativePersistence(AsyncStorage);
}

let auth;


if (!getApps()[0]._auth) {
  auth = initializeAuth(app, { persistence });
} else {
  auth = getAuth(app); 
}

export { auth };

// Firestore
export const db = getFirestore(app);
