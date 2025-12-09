// firebaseConfig.ts

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp, getApp, getApps } from "firebase/app";
// @ts-ignore - getReactNativePersistence finnes i RN-builden av auth selv om TS klager
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  StorageReference,
} from "firebase/storage";
import firebaseConfig from "./firebaseEnv.js";

// Sørg for at Firebase-appen bare initialiseres én gang
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Auth med AsyncStorage-persistens (for React Native / Expo)
let authInstance;
try {
  authInstance = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (e) {
  // Hvis initializeAuth allerede er kalt (f.eks. ved hot reload), hent eksisterende instans
  authInstance = getAuth(app);
}
export const auth = authInstance;

// Firestore
export const db = getFirestore(app);

// Storage
const storage = getStorage(app);

export const getStorageRef = (path: string): StorageReference =>
  ref(storage, path);

export const getDownloadUrl = async (path: string): Promise<string> => {
  const storageRef = getStorageRef(path);
  return await getDownloadURL(storageRef);
};
