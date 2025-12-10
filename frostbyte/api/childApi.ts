import { collection, addDoc, getDocs} from "firebase/firestore";
import {db} from "../firebaseConfig"
import { FirebaseError } from "firebase/app";

export interface childApiData{
    name: string;
    image: string;
}
export async function uploadData(data: childApiData) {
    try{
        const docRef = await addDoc(collection(db, "childData"), data);
        console.log("Doc written with id: ", docRef.id);
        return null;
    } catch (e){
        if (e instanceof FirebaseError){
            switch(e.code){
                case "permission-denied":
                    return "Du har ikke lov til å utføre operasjonen";
                case "unauthenticated":
                    return "Du er ikke autorisert til å gjøre denne handlingen";
                default:
                    return "Ukjent feil oppstod";
            }
        }

    }
}

export async function getData(): Promise<[childApiData[], string | null]> {
  try {
    const snapshot = await getDocs(collection(db, "childData"));
    const data = snapshot.docs.map((doc) => doc.data() as childApiData);
    return [data, null];
  } catch (e: unknown) {
    if (e instanceof FirebaseError) {
      return [[], e.message];
    }

    const message = e instanceof Error ? e.message : "unknown error";
    return [[], message];
  }
}

