// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR7EYOIJkZ9sVSSoLSYwvzUKw4OITMOSI",
  authDomain: "contesthub-18911.firebaseapp.com",
  projectId: "contesthub-18911",
  storageBucket: "contesthub-18911.firebasestorage.app",
  messagingSenderId: "784064009534",
  appId: "1:784064009534:web:ea3919a8fd6934ca28c86f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
