import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCqQjMcaAJIB4L1pzEh78kdBR9L8yd0z80",
    authDomain: "final-prac-11645.firebaseapp.com",
    projectId: "final-prac-11645",
    storageBucket: "final-prac-11645.appspot.com",
    messagingSenderId: "491656955431",
    appId: "1:491656955431:web:76108f92114f810bf2b002",
    measurementId: "G-J8KM5LYR1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);