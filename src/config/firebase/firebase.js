// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCvdhl_Lyxf0SUnmLhTxRa3_aPuqiVv8Qg',
  authDomain: 'news-app-triveous-1.firebaseapp.com',
  projectId: 'news-app-triveous-1',
  storageBucket: 'news-app-triveous-1.appspot.com',
  messagingSenderId: '1039828669829',
  appId: '1:1039828669829:web:0ff9f4d2a55bb8836c20ec',
  measurementId: 'G-GFNHTCH1CC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
