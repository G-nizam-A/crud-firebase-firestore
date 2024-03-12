// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.DB_API,
  authDomain: "data-de6b9.firebaseapp.com",
  databaseURL: "https://data-de6b9-default-rtdb.firebaseio.com",
  projectId: "data-de6b9",
  storageBucket: "data-de6b9.appspot.com",
  messagingSenderId: "514258317873",
  appId: "1:514258317873:web:0700b63672dcf832f79b10",
  measurementId: "G-D0K7EC8N16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
