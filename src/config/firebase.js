  // Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import {getFirestore} from '@firebase/firestore'
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAgtEBTQ7B0Ce3v4PGzn024pwSOTrQYWFo",
    authDomain: "absensi-d4466.firebaseapp.com",
    projectId: "absensi-d4466",
    storageBucket: "absensi-d4466.appspot.com",
    messagingSenderId: "27503783241",
    appId: "1:27503783241:web:5ae948816464220db37e98",
    measurementId: "G-FFNSKC5DQJ"
  };

  // Initialize Firebase
const app =  firebase.initializeApp(firebaseConfig)

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app
// Initialize Firebase Authentication and get a reference to the service
