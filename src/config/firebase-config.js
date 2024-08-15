// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbOQ8oBpM1hHBFhmIS88JQ5TeGDNaXGQA",
  authDomain: "expense-tracker-f3062.firebaseapp.com",
  projectId: "expense-tracker-f3062",
  storageBucket: "expense-tracker-f3062.appspot.com",
  messagingSenderId: "766406256416",
  appId: "1:766406256416:web:7a78b8b7150772c4791945"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);
