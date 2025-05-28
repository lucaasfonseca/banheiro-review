// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ⬅️ adicione esta linha

const firebaseConfig = {
  apiKey: "AIzaSyAQgFl75xseAOheTOt-fex3Paxu9g7Z0IE",
  authDomain: "banheiro-review.firebaseapp.com",
  projectId: "banheiro-review",
  storageBucket: "banheiro-review.appspot.com",
  messagingSenderId: "147109687276",
  appId: "1:147109687276:web:f4593385e0a4619191dac9",
  measurementId: "G-HR52CQ3ZDW",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ⬅️ instância do Firestore

export { app, auth, db }; // ⬅️ exporte também o db
