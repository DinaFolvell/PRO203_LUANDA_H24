import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";

export async function signIn(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed in ", userCredential);
    })
    .catch((error) => console.log("Oops, kunne ikke logge inn", error));
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
