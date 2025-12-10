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

  static async getAllChildren(): Promise<[Child[], string | null]> {
    try {
      const snapshot = await getDocs(collection(db, this.COLLECTION_NAME));
      const children = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Child)
      );
      return [children, null];
    } catch (e) {
      return [[], this.handleError(e)];
    }
  }

  static async getChildById(
    id: string
  ): Promise<[Child | null, string | null]> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const child = {
          id: docSnap.id,
          ...docSnap.data(),
        } as Child;
        return [child, null];
      }
      return [null, "Barnet ble ikke funnet"];
    } catch (e) {
      return [null, this.handleError(e)];
    }
  }

  static async getChildrenByStatus(
    status: AttendanceStatus
  ): Promise<[Child[], string | null]> {
    const [children, error] = await this.getAllChildren();
    if (error) return [[], error];

    return [children.filter((c) => c.attendance === status), null];
  }

  static async getAttendanceCounts(): Promise<
    [
      {
        all: number;
        present: number;
        expected: number;
        picked_up: number;
        absent: number;
      },
      string | null
    ]
  > {
    const [children, error] = await this.getAllChildren();
    if (error) {
      return [
        { all: 0, present: 0, expected: 0, picked_up: 0, absent: 0 },
        error,
      ];
    }

    const counts = {
      all: children.length,
      present: 0,
      expected: 0,
      picked_up: 0,
      absent: 0,
    };

    children.forEach((child) => {
      counts[child.attendance]++;
    });

    return [counts, null];
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

  static async addChild(
    childData: ChildApiData
  ): Promise<[string | null, string | null]> {
    try {
      const docRef = await addDoc(
        collection(db, this.COLLECTION_NAME),
        childData
      );
      return [docRef.id, null];
    } catch (e) {
      return [null, this.handleError(e)];
    }
  }

  static async removeChild(id: string): Promise<string | null> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      await deleteDoc(docRef);
      return null;
    } catch (e) {
      return this.handleError(e);
    }
  }

  static async updateChild(
    id: string,
    childData: Partial<ChildApiData>
  ): Promise<string | null> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      await updateDoc(docRef, childData);
      return null;
    } catch (e) {
      return this.handleError(e);
    }
  }

  private static handleError(e: unknown): string {
    if (e instanceof FirebaseError) {
      switch (e.code) {
        case "permission-denied":
          return "Du har ikke lov til å utføre denne operasjonen";
        case "unauthenticated":
          return "Du er ikke autorisert til å gjøre denne handlingen";
        case "not-found":
          return "Dokumentet ble ikke funnet";
        case "unavailable":
          return "Tjenesten er utilgjengelig. Prøv igjen senere";
        default:
          return `Firebase feil: ${e.message}`;
      }
    }

    return e instanceof Error ? e.message : "Ukjent feil oppstod";
  }
}
