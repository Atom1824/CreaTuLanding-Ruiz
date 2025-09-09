// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8LVtRfBiaYtOSuftmhqa795bkasJ_07w",
  authDomain: "gamestore-c51e4.firebaseapp.com",
  projectId: "gamestore-c51e4",
  storageBucket: "gamestore-c51e4.firebasestorage.app",
  messagingSenderId: "244402447668",
  appId: "1:244402447668:web:8674bf36b070a636e9f161",
  measurementId: "G-RD3VHENZ9C"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
