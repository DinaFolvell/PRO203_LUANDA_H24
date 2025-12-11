import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FirebaseError } from "firebase/app";

export type AttendanceStatus = "present" | "expected" | "picked_up" | "absent";

export interface Child {
  id: string;
  name: string;
  image: string;
  attendance: AttendanceStatus;
}

export interface ChildApiData {
  name: string;
  image: string;
  attendance: AttendanceStatus;
}

export class ChildService {
  private static readonly COLLECTION_NAME = "childData";

  static async getAllChildren() {
    try {
      const snapshot = await getDocs(collection(db, this.COLLECTION_NAME));
      return [
        snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Child)
        ),
        null,
      ];
    } catch (e) {
      return [[], this.handleError(e)];
    }
  }

  static async updateChildAttendance(
    id: string,
    newStatus: AttendanceStatus
  ): Promise<string | null> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      await updateDoc(docRef, { attendance: newStatus });
      return null;
    } catch (e) {
      return this.handleError(e);
    }
  }

  private static handleError(e: unknown): string {
    if (e instanceof FirebaseError) return e.message;
    return "Ukjent feil";
  }
}
