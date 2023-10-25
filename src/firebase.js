import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC1scVQ9PJGU3lw1zN_KmuYfSAed4Zw4dg", 
  authDomain: "aa-ride-along.firebaseapp.com",
  databaseURL: "https://aa-ride-along-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aa-ride-along",
  storageBucket: "aa-ride-along.appspot.com",
  messagingSenderId: "295187769454",
  appId: "1:295187769454:web:3939fe236ac2a14e789e7f",
  measurementId: "G-77659PYZMV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
