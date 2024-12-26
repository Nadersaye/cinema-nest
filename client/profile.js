import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
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
const auth = getAuth();

// Handle profile dropdown toggle
function toggleDropdown() {
    const profileDropdown = document.getElementById('profileDropdown');
    profileDropdown.classList.toggle('show');
}

// Listen for authentication state changes
// Listen for authentication state changes
// Redirect to login page
function redirectToLogin() {
    window.location.href = './login-in.html'; // Update the path to match your login page
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    const profileCircle = document.querySelector('.profile-circle');
    const profileDropdown = document.getElementById('profileDropdown');
    const welcomeHeading = document.querySelector('.cover-content h1'); // Target the welcome message

    if (user) {
        // User is signed in
        const displayName = user.displayName || "User";
        const firstName = displayName.split(' ')[0];
        const email = user.email;

        // Update the profile UI
        profileCircle.textContent = displayName.split(' ').map(name => name[0]).join('');
        profileDropdown.innerHTML = `
            <p style="color: black;"><strong>Name:</strong> ${displayName}</p>
            <p style="color: black;"><strong>Email:</strong> ${email}</p>
            <button style="background-color: orange; padding: 5px; border-radius: 3px;" id="logout-btn">Logout</button>
        `;

        // Update welcome message
        welcomeHeading.textContent = `Welcome ${firstName}`;

        // Attach logout functionality
        const logoutButton = document.getElementById('logout-btn');
        logoutButton.addEventListener('click', () => {
            console.log('Logout button clicked');
            signOut(auth)
                .then(() => {
                    console.log('User signed out');
                    redirectToLogin();
                })
                .catch((error) => {
                    console.error('Sign out error:', error);
                });
        });
    } else {
        // User is signed out
        console.log('No user is currently signed in.');
        profileDropdown.innerHTML = `
            <p style="color: black;">Please <a href="sign-in.html">sign in</a>.</p>
        `;
        welcomeHeading.textContent = "Welcome Guest";
    }
});
// On page load, push the current state


// Push a state to the history when the page loads
history.pushState(null, null, location.href);
history.pushState(null, null, location.href); // Push another state to make sure the user can't go back

// Listen for popstate event to intercept back navigation
window.onpopstate = function () {
    // Push the current state again to prevent going back
    history.go(1);
};



// Export toggleDropdown for inline use in HTML
window.toggleDropdown = toggleDropdown;
