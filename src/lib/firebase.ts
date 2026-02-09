// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZENOOy_cFBhwdcPuybqj4nQ2ckY1cEZQ",
    authDomain: "apostolidis-demo.firebaseapp.com",
    projectId: "apostolidis-demo",
    storageBucket: "apostolidis-demo.firebasestorage.app",
    messagingSenderId: "407785895813",
    appId: "1:407785895813:web:bf947a03359e64b89b36ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app, firebaseConfig };
