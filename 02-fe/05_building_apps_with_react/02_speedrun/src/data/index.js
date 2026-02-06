const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const API_URL = 'https://api.themoviedb.org/3/movie';

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
	}
};

const getPopularMovies = async abortController => {
	const res = await fetch(`${API_URL}/popular?language=en-US&page=1`, {
		...options,
		signal: abortController.signal
	});
	if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

	const data = await res.json();

	return data.results;
};

const getSingleMovie = async (movieId, abortController) => {
	const res = await fetch(`${API_URL}/${movieId}?language=en-US`, {
		...options,
		signal: abortController.signal
	});
	if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

	const data = await res.json();

	return data;
};

export { getPopularMovies, getSingleMovie, IMG_URL };
