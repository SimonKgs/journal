// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5xXNHPkc6KpQ8gosejF5JcbNuXDQaAXs",
  authDomain: "journal-9a06a.firebaseapp.com",
  projectId: "journal-9a06a",
  storageBucket: "journal-9a06a.appspot.com",
  messagingSenderId: "709729365720",
  appId: "1:709729365720:web:b0a6726a19b3b96fd2b1ad"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
//  funcionalidades de autenticacion
export const FirebaseAuth = getAuth( FirebaseApp );
//  configuracion de mi base de datos
export const FirebaseDB = getFirestore( FirebaseApp );