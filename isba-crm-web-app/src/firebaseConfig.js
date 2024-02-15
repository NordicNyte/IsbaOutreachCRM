import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpLioyrvcPsNmCJ5zDdn3aC3Xme1tWCE4",
  authDomain: "isba-outreach-crm.firebaseapp.com",
  projectId: "isba-outreach-crm",
  storageBucket: "isba-outreach-crm.appspot.com",
  messagingSenderId: "678012684346",
  appId: "1:678012684346:web:824364e608a318f8e38d03",
  measurementId: "G-PXY8J3CXCQ",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
