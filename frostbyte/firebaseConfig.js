import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseEnv";
import {getFirestore} from "firebase/firestore"


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);