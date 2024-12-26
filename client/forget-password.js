import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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
const auth = getAuth();

const emailInput = document.getElementById('email');
const resetPasswordBtn = document.getElementById('reset-password');
const emailError = document.getElementById('email-error');

const emailRgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email) {
    emailError.innerText = '';
    emailInput.classList.remove('invalid');

    if (!emailRgx.test(email)) {
        emailError.innerText = '! Please enter a valid email.';
        emailInput.classList.add('invalid');
        return false;
    }

    return true;
}

emailInput.addEventListener('focus', function () {
    this.classList.remove('invalid');
});

resetPasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const emailValue = emailInput.value;

    if (validateEmail(emailValue)) {
        sendPasswordResetEmail(auth, emailValue)
            .then(() => {
                // Password reset email sent!
                console.log('Password reset email sent!');
                document.getElementById('reset-success').innerText = 'Password reset email sent!';
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage;

                switch (errorCode) {
                    case 'auth/invalid-email':
                        errorMessage = 'The email address is not valid.';
                        break;
                    case 'auth/user-not-found':
                        errorMessage = 'User not found. Please check the email address.';
                        break;
                    default:
                        errorMessage = 'An unknown error occurred.';
                        break;
                }

                console.error(errorMessage);
                document.getElementById('reset-error').innerText = errorMessage;
            });
    }
});