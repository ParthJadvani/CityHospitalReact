// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg2PlwB4D4coJ0RSCycibFm87mVuMkgGQ",
  authDomain: "cityhospital64-972d4.firebaseapp.com",
  projectId: "cityhospital64-972d4",
  storageBucket: "cityhospital64-972d4.appspot.com",
  messagingSenderId: "1076481621279",
  appId: "1:1076481621279:web:b88d74936f91f92820442a",
  measurementId: "G-91Y93N4C3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);