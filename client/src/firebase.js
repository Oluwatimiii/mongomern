// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-2fa31.firebaseapp.com",
  projectId: "mern-auth-2fa31",
  storageBucket: "mern-auth-2fa31.appspot.com",
  messagingSenderId: "73696396992",
  appId: "1:73696396992:web:b692dcd14b29539b468f25",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);