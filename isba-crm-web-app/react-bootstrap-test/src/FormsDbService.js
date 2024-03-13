// FormsDbService.js
import { db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const addConnection = async (newConnectionData) => {
  try {
    const docRef = await addDoc(collection(db, "connections"), newConnectionData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
