// api/authApi.ts
import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed in", userCredential.user.uid);
  } catch (error) {
    console.log("Oops, kunne ikke logge inn", error);
    throw error;
  }
}

export async function signOut() {
  await auth.signOut();
}

export async function createUser(email: string, password: string) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials.user;
  } catch (error) {
    console.error("Oops! kunne ikke opprette bruker", error);
    throw error;
  }
}

export async function setUserDisplayName(user: User, displayName: string) {
  try {
    await updateProfile(user, {
      displayName,
    });
  } catch (error) {
    console.error("Oops! kunne ikke oppdatere display name", error);
  }
}
