import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebaseEnv";
import { Platform } from "react-native";

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence:
    Platform.OS === "web"
    ? browserLocalPersistence
    : getReactNativePersistence(ReactNativeAsyncStorage),
});


export const db = getFirestore(app);

