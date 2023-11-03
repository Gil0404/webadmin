import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyAkFCgeMiNZk9zV9S05xO00Ol3rEtfcqwk",
  authDomain: "v5angkas.firebaseapp.com",
  databaseURL: "https://v5angkas-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "v5angkas",
  storageBucket: "v5angkas.appspot.com",
  messagingSenderId: "815935174111",
  appId: "1:815935174111:web:3e6f36c80dbeb9a221006a",
  measurementId: "G-EFZ6C567X3"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const dbs = getDatabase(app);