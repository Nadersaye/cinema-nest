import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBFP_xXCsM7BflbSqVt_o4ovlgaB4U4uJ0",
    authDomain: "cinema-nest.firebaseapp.com",
    projectId: "cinema-nest",
    storageBucket: "cinema-nest.firebasestorage.app",
    messagingSenderId: "250134424010",
    appId: "1:250134424010:web:c047f80ccec3012bed4733",
    measurementId: "G-4EH7FHYGL6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const login = document.getElementById('submit-btn');
let emailError = document.getElementById('email-error');
let passwordError = document.getElementById('password-error');
let authError = document.getElementById('auth-error');


const emailrgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordrgx = /^.{6,30}$/;

function validateInput(email, password) {
    let isValid = true;

    emailError.innerText = '';
    passwordError.innerText = '';

    emailInput.classList.remove('invalid');
    passwordInput.classList.remove('invalid');

    if (!emailrgx.test(email)) {
        emailError.innerText = '! Please enter a valid email.';
        emailInput.classList.add('invalid');
        isValid = false;
    }

    if (!passwordrgx.test(password)) {
        passwordError.innerText = '! Please enter a valid password.';
        passwordInput.classList.add('invalid');
        isValid = false;
    }

    return isValid;
}

emailInput.addEventListener('focus', function () {
    this.classList.remove('invalid');
});

passwordInput.addEventListener('focus', function () {
    this.classList.remove('invalid');
});

login.addEventListener('click', (e) => {
    e.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    if (validateInput(emailValue, passwordValue)) {
        signInWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user.emailVerified) {
                    console.log('Email is verified');
                    // Navigate to the home page
                    window.location.href = './welcome_profile.html';
                } else {
                    console.log('Email is not verified');
                    authError.innerText = '! Email is not verified';
                    // Handle the case where the email is not verified
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage;

                switch (errorCode) {
                    case 'auth/invalid-credential':
                        errorMessage = 'The email address or password is not valid.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'The email address is not valid.';
                        break;
                    case 'auth/user-disabled':
                        errorMessage = 'The user account has been disabled.';
                        break;
                    case 'auth/user-not-found':
                        errorMessage = 'No user found with this email.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Incorrect password.';
                        break;
                    default:
                        errorMessage = 'An unknown error occurred.';
                        break;
                }

                console.log(errorMessage);
                authError.innerText = errorMessage;
            });
    }
});