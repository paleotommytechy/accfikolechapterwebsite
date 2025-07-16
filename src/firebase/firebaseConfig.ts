// src/firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAR7S4CPHe5t6zew7-Rr5OQIR4YPUH1Q7I",
  authDomain: "accfikolewebsite.firebaseapp.com",
  projectId: "accfikolewebsite",
  storageBucket: "accfikolewebsite.firebasestorage.app",
  messagingSenderId: "224273120090",
  appId: "1:224273120090:web:cb2efc2a84bd90ada15163"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
