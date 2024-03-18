import { db } from "./FirebaseConfig";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";

export const addConnection = (connectionData) => {
  const collectionRef = collection(db, 'connections');
  return addDoc(collectionRef, connectionData)
    .then(() => {
      console.log('Connection added successfully');
    })
    .catch((error) => {
      console.error('Error adding connection: ', error);
    });
};

export const removeConnection = (connectionData) => {
  const docRef = doc(db, 'connections', connectionData.id);
  return deleteDoc(docRef)
    .then(() => {
      console.log('Connection removed successfully');
    })
    .catch((error) => {
      console.error('Error removing connection: ', error);
    });
};
