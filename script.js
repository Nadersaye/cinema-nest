const apiKey = 'b8f26c3dc48f46567efe9a57b1fdd6df';
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

function fetchMovies() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', apiUrl, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const result = JSON.parse(xhr.responseText);
            displayMovies(result.results);
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            console.error('Error fetching data:', xhr.statusText);
        }
    };

    xhr.send();
}

function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="movie-content">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-overview">${movie.overview}</div>
                <div class="movie-release">Release Date: ${movie.release_date}</div>
                <button class="fav-button" onclick="addToCart('${movie.id}', '${movie.title}', 'https://image.tmdb.org/t/p/w500${movie.poster_path}')">
                    Add to Cart
                </button>
            </div>
        `;

        movieList.appendChild(movieElement);
    });
}

function addToCart(id, title, poster) {
    // Get existing cart from local storage
    const cart = JSON.parse(localStorage.getItem('movieCart')) || [];

    // Check if the movie is already in the cart
    const isAlreadyInCart = cart.some(movie => movie.id === id);

    if (!isAlreadyInCart) {
        cart.push({ id, title, poster });
        localStorage.setItem('movieCart', JSON.stringify(cart));
        alert(`${title} has been added to your cart.`);
    } else {
        alert(`${title} is already in your cart.`);
    }

  
}

function viewCart() {
    const cart = JSON.parse(localStorage.getItem('movieCart')) || [];
    console.log('Cart Items:', cart);
}

// Call fetchMovies on page load
window.onload = fetchMovies;
