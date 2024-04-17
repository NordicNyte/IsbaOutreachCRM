// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpLioyrvcPsNmCJ5zDdn3aC3Xme1tWCE4",
  authDomain: "isba-outreach-crm.firebaseapp.com",
  projectId: "isba-outreach-crm",
  storageBucket: "isba-outreach-crm.appspot.com",
  messagingSenderId: "678012684346",
  appId: "1:678012684346:web:824364e608a318f8e38d03",
  measurementId: "G-PXY8J3CXCQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
