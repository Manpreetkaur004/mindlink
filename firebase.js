// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_3FMOIZeIpR0bB5AvpbMPAJAHgDYsjC8",
  authDomain: "auracare-be0b7.firebaseapp.com",
  projectId: "auracare-be0b7",
  storageBucket: "auracare-be0b7.firebasestorage.app",
  messagingSenderId: "1058558452227",
  appId: "1:1058558452227:web:be5cc17960e1deeceae436",
  measurementId: "G-61WV2H54QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Setup Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
