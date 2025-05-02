// Replace with your actual Firebase config from Firebase Console
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLAOgDlVhIdIMtcE7GJ-qelOVLPdFiabc",
  authDomain: "delmart-9340b.firebaseapp.com",
  projectId: "delmart-9340b",
  storageBucket: "delmart-9340b.firebasestorage.app",
  messagingSenderId: "545535236628",
  appId: "1:545535236628:web:7f18ed53d6d50e6c8e2501",
  measurementId: "G-KJHH8SBB0M",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
