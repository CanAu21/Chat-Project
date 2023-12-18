// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-fXaXiLYCJs5BmJJfIc3GFAqxveyPgHE",
  authDomain: "chat-c2870.firebaseapp.com",
  projectId: "chat-c2870",
  storageBucket: "chat-c2870.appspot.com",
  messagingSenderId: "232687117387",
  appId: "1:232687117387:web:548dbb430ee756030e99ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// konsoldaki Authentication bölümünün referansını alır
export const auth = getAuth(app);

// google sağlayıcısının referansını alma
export const provider = new GoogleAuthProvider();

// veritabanının referansını alır
export const db = getFirestore(app);
