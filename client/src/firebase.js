// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-c2780.firebaseapp.com",
  projectId: "mern-estate-c2780",
  storageBucket: "mern-estate-c2780.appspot.com",
  messagingSenderId: "298668680030",
  appId: "1:298668680030:web:d3a2ad5515de12055625cf",
  measurementId: "G-XNPYLQMFPK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);