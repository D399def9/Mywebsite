// firebase.js
// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, doc, getDoc, query, collection, where, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCRZSKBoKjtJgZdWUwvPKwDiL0ZBR7BWEI",
  authDomain: "just-learn-1.firebaseapp.com",
  projectId: "just-learn-1",
  storageBucket: "just-learn-1.appspot.com",
  messagingSenderId: "100113298256",
  appId: "1:100113298256:web:d4c222a4ed7842c93c7255",
  measurementId: "G-G4NGBD7PTJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, doc, getDoc, query, collection, where, getDocs };