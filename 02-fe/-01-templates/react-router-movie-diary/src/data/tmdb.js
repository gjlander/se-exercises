const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        // create a .env.local file and add VITE_TMDB_KEY=<your tmdb auth key>
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    },
};

// returns an array of 20 of the most popular movies
const getPopularMovies = async () => {
    const res = await fetch(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        options
    );
    if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

    const data = await res.json();

    return data.results;
};

//returns a single movie
const getSingleMovie = async (movieId) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        options
    );
    if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

    const data = await res.json();

    return data;
};

export { getPopularMovies, getSingleMovie, IMG_URL };
