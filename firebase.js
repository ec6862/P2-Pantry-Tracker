// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZHRzfxUIb8yz6rFle2P9jg7a6H5PcVAc",
  authDomain: "inventory-management-cfd84.firebaseapp.com",
  projectId: "inventory-management-cfd84",
  storageBucket: "inventory-management-cfd84.appspot.com",
  messagingSenderId: "922586693602",
  appId: "1:922586693602:web:3077cdc92a0c8fc13d03bb",
  measurementId: "G-8K7PFZJ3QN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore};