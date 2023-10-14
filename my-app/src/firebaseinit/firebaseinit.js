// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkllqr9ojTPKUfHCHpFtIQnIHCcAhYSs0",
  authDomain: "buyfreely-a92dd.firebaseapp.com",
  projectId: "buyfreely-a92dd",
  storageBucket: "buyfreely-a92dd.appspot.com",
  messagingSenderId: "474194485605",
  appId: "1:474194485605:web:276ad387a63bab4b74418c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);