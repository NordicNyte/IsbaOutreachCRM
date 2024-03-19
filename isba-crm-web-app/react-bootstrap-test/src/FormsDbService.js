import { db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

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

export const removeConnection = (removalRequestData) => {
  const collectionRef = collection(db, 'removal_requests');
  return addDoc(collectionRef, removalRequestData)
    .then(() => {
      console.log('Removal request added successfully');
    })
    .catch((error) => {
      console.error('Error submitting removal request: ', error);
    });
};
