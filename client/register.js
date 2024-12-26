import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
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

const fNameInput = document.getElementById('f-name');
const lNameInput = document.getElementById('l-name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signUp = document.getElementById('sign-up');

let fNameError = document.getElementById('f-name-error');
let lNameError = document.getElementById('l-name-error');
let emailError = document.getElementById('email-error');
let passwordError = document.getElementById('password-error');

const nameRgx = /^[A-Za-z]{3,30}$/;
const emailRgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRgx = /^.{6,30}$/;

function validateInput(fName, lName, email, password) {
    let isValid = true;

    fNameError.innerText = '';
    lNameError.innerText = '';
    emailError.innerText = '';
    passwordError.innerText = '';

    fNameInput.classList.remove('invalid');
    lNameInput.classList.remove('invalid');
    emailInput.classList.remove('invalid');
    passwordInput.classList.remove('invalid');

    if (!nameRgx.test(fName)) {
        fNameError.innerText = '! Please enter a valid first name.';
        fNameInput.classList.add('invalid');
        isValid = false;
    }

    if (!nameRgx.test(lName)) {
        lNameError.innerText = '! Please enter a valid last name.';
        lNameInput.classList.add('invalid');
        isValid = false;
    }

    if (!emailRgx.test(email)) {
        emailError.innerText = '! Please enter a valid email.';
        emailInput.classList.add('invalid');
        isValid = false;
    }

    if (!passwordRgx.test(password)) {
        passwordError.innerText = '! Please enter a valid password.';
        passwordInput.classList.add('invalid');
        isValid = false;
    }

    return isValid;
}

fNameInput.addEventListener('focus', function () {
    this.classList.remove('invalid');
});

lNameInput.addEventListener('focus', function () {
    this.classList.remove('invalid');
});

emailInput.addEventListener('focus', function () {
    this.classList.remove('invalid');
});

passwordInput.addEventListener('focus', function () {
    this.classList.remove('invalid');
});

signUp.addEventListener('click', (e) => {
    e.preventDefault();
    const fNameValue = fNameInput.value;
    const lNameValue = lNameInput.value;
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    const userName = fNameValue + ' ' + lNameValue;

    if (validateInput(fNameValue, lNameValue, emailValue, passwordValue)) {
        createUserWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                updateProfile(user, {
                    displayName: userName // Set the username
                }).then(() => {
                    console.log('Username set successfully');
                    //send email verification
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            // Email verification sent!
                            console.log('Email verification sent!');
                            window.location.href = 'login-in.html';
                        });
                }).catch((error) => {
                    console.error('Error setting username:', error);
                });
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage;

                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'The email address is already in use.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'The email address is not valid.';
                        break;
                    case 'auth/operation-not-allowed':
                        errorMessage = 'Email/password accounts are not enabled.';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'The password is too weak.';
                        break;
                    default:
                        errorMessage = 'An unknown error occurred.';
                        break;
                }

                console.log(errorMessage);
                document.getElementById('auth-error').innerText = errorMessage;
            });
    }
});