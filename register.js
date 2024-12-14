// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFP_xXCsM7BflbSqVt_o4ovlgaB4U4uJ0",
    authDomain: "cinema-nest.firebaseapp.com",
    projectId: "cinema-nest",
    storageBucket: "cinema-nest.firebasestorage.app",
    messagingSenderId: "250134424010",
    appId: "1:250134424010:web:c047f80ccec3012bed4733",
    measurementId: "G-4EH7FHYGL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);