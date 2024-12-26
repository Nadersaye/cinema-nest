const apiKey = 'b8f26c3dc48f46567efe9a57b1fdd6df';
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;


const moviePrices = [
    12.99, 10.99, 9.99, 8.99, 11.99, 14.99, 13.99, 7.99, 8.99, 12.99,12.99, 10.99, 9.99, 8.99, 11.99, 14.99, 13.99, 7.99, 8.99, 12.99
    
];

function fetchMovies() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const movies = data.results;

          
            if (document.body.classList.contains('home-page')) {
                displayMovies(movies, true); // Show movies without 'Add to Cart' button on home page
            } else {
                displayMovies(movies, false); 
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayMovies(movies, isHomePage) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; // Clear the movie list first

    // If on the home page, show only a portion of the movies (half, as requested)
    const moviesToDisplay = isHomePage ? movies.slice(0, Math.floor(movies.length / 4)) : movies;

    moviesToDisplay.forEach((movie, index) => {
        // Get the price for each movie from the moviePrices array
        const price = moviePrices[index] || 'Price not available'; 
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="movie-content">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-release">Release Date: ${movie.release_date}</div>
                <div class="movie-price">${price === 'Price not available' ? price : `$${price}`}</div>
                ${!isHomePage ? `<button class="fav-button" onclick="addToCart('${movie.id}', '${movie.title}', 'https://image.tmdb.org/t/p/w500${movie.poster_path}', ${price})">Add to Cart</button>` : ''}
            </div>
        `;

        movieList.appendChild(movieElement);
    });
}



function addToCart(id, title, poster, price) {
    // Get existing cart from local storage
    const cart = JSON.parse(localStorage.getItem('movieCart')) || [];

    // Check if the movie is already in the cart
    const isAlreadyInCart = cart.some(movie => movie.id === id);

    if (!isAlreadyInCart) {
        cart.push({ id, title, poster, price });
        localStorage.setItem('movieCart', JSON.stringify(cart));
        alert(`${title} has been added to your cart.`);
    } else {
        alert(`${title} is already in your cart.`);
    }
}

window.onload = function () {
    if (document.getElementById('welcome')) {
        document.body.classList.add('home-page');
    }
    fetchMovies();
};

document.addEventListener('click', function () {
    if (event.target && event.target.id === 'paymentButton') {
    console.log('Payment button clicked');

    fetch('http://localhost:3000/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            items: [
                { id: 1, quantity: 1 },
            ],
        }),
    })
        .then(res => {
            if (res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
        })
        .then(({ url }) => {
            window.location = url;
        })
        .catch(e => {
            console.error(e.error);
        });
    }
});

// ////////////////////////////////////
// document.addEventListener("DOMContentLoaded", () => {
//     // Simulating user authentication status (true for logged in, false for not logged in)
//     let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//     // Check if the user is logged in
//     if (!isLoggedIn) {
//         // Redirect to the welcome section if not logged in
//         window.location.hash = "#welcome";
//         alert("Please sign in to access the home page!");
//     } else {
//         // Customize the welcome message after login
//         const welcomeSection = document.querySelector("#welcome .cover-content");
//         if (welcomeSection) {
//             welcomeSection.innerHTML = `
//                 <h1>Welcome Back!</h1>
//                 <p>Thank you for logging in. Enjoy exploring our movie collection!</p>
//                 <a href="#sample-movies" class="btn">Explore Movies</a>
//             `;
//         }
//     }

//     // Example: Set user as logged in (for demonstration purposes)
//     document.querySelector(".btn").addEventListener("click", () => {
//         localStorage.setItem("isLoggedIn", "true");
//     });
// });
// function logout() {
//     // Clear login status
//     localStorage.removeItem("isLoggedIn");

//     // Redirect to welcome page
//     window.location.hash = "#welcome";

//     // Optionally, show an alert
//     alert("You have been logged out successfully!");
// }
// // Check for a stored profile image and update the profile-circle
// document.addEventListener("DOMContentLoaded", () => {
//     const storedProfileImage = localStorage.getItem("profileImage");
//     if (storedProfileImage) {
//         document.getElementById("profile-circle").src = storedProfileImage;
//     }
// });

// // To allow uploading a new profile picture
// function updateProfileImage(imageSrc) {
//     // Save the image in localStorage
//     localStorage.setItem("profileImage", imageSrc);

//     // Update the profile-circle
//     document.getElementById("profile-circle").src = imageSrc;
// }
document.addEventListener("DOMContentLoaded", function() {
    const signInButton = document.getElementById('sign-in-button');
    const getStartedButton = document.getElementById('get-started-button');

    // Simulating a sign-in action, replace this with real sign-in logic
    const isUserSignedIn = localStorage.getItem('isSignedIn') === 'true';

    if (isUserSignedIn) {
        // If the user is signed in, hide the "Sign In" button and show the "Explore More Movies" button
        signInButton.style.display = 'none';
        getStartedButton.style.display = 'inline-block';
    } else {
        // If the user is not signed in, show the "Sign In" button
        signInButton.style.display = 'inline-block';
        getStartedButton.style.display = 'none';
    }

    // Event listener for signing in (you should replace this with real authentication logic)
    signInButton.addEventListener('click', function() {
        localStorage.setItem('isSignedIn', 'true');
        signInButton.style.display = 'none';
        getStartedButton.style.display = 'inline-block';
    });
});