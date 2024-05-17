import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ashtongrayportal.firebaseapp.com",
  projectId: "ashtongrayportal",
  storageBucket: "ashtongrayportal.appspot.com",
  messagingSenderId: "580444071908",
  appId: "1:580444071908:web:1737f1ce85dda5337dc9f1",
};

export const app = initializeApp(firebaseConfig);
