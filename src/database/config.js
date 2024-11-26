// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUYHQZqdRD4ewiLJcSa7N2_oAlhNffLBc",
  authDomain: "eventmanagement-cf407.firebaseapp.com",
  projectId: "eventmanagement-cf407",
  storageBucket: "eventmanagement-cf407.firebasestorage.app",
  messagingSenderId: "959376596060",
  appId: "1:959376596060:web:9ccd8bea58da091e555a99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app);