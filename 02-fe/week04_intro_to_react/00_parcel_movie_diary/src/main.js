const moviesCont = document.querySelector('#movies-container');
const searchForm = document.querySelector('#search-form');
const resultsCont = document.querySelector('#results-container');

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const addToFavs = ({ id, original_title, poster_path, overview }) => {
    const moviesInStorage = JSON.parse(localStorage.getItem('favorites')) || [];
    if (moviesInStorage.some((movie) => movie.id === id)) return;
    const storageMovie = {
        id,
        original_title,
        poster_path,
        overview,
        notes: 'No notes yet.',
    };

    moviesInStorage.push(storageMovie);
    localStorage.setItem('favorites', JSON.stringify(moviesInStorage));
};
const renderMovies = (moviesArray) => {
    // console.log('You clicked the summon button!');
    moviesCont.innerHTML = '';
    // console.log(moviesArray);
    moviesArray.forEach((movie) => {
        const { poster_path, original_title, overview } = movie;
        const card = document.createElement('div');
        card.className =
            'transition ease-in-out delay-150 shadow-xl hover:shadow-2xl h-[44rem] hover:cursor-pointer hover:scale-105 rounded-lg';

        const figure = document.createElement('figure');
        figure.className = 'rounded-t-lg overflow-hidden h-96';
        const img = document.createElement('img');
        img.className = 'w-full h-full';
        img.src = IMG_URL + poster_path;
        img.alt = original_title;
        figure.appendChild(img);

        const cardBody = document.createElement('div');
        cardBody.className =
            'flex flex-col px-4 py-2 items-start rounded-b-lg bg-slate-100 dark:bg-slate-800 min-h-80';
        const title = document.createElement('h2');
        title.className = 'text-4xl w-full border-b-2 mb-4 border-b-gray-400';
        title.textContent = original_title;
        const addToFav = document.createElement('button');
        addToFav.textContent = '☆ Add to favorites';
        addToFav.addEventListener('click', () => addToFavs(movie));
        const bodyText = document.createElement('p');
        bodyText.textContent = overview;
        cardBody.appendChild(title);
        cardBody.appendChild(addToFav);
        cardBody.appendChild(bodyText);

        card.appendChild(figure);
        card.appendChild(cardBody);

        moviesCont.appendChild(card);

        // moviesCont.innerHTML += `<div class="transition ease-in-out delay-150 shadow-xl hover:shadow-2xl h-[44rem] hover:cursor-pointer hover:scale-105 rounded-lg">
        // <figure class='rounded-t-lg overflow-hidden h-96'>
        //  <img
        //  class="w-full"
        //      src=${IMG_URL + poster_path}
        //      alt=${original_title} />
        // </figure>
        // <div class="flex flex-col px-4 py-2 rounded-b-lg bg-slate-100 dark:bg-slate-800 h-80">
        //     <h2 class="text-4xl border-b-2 mb-4 border-b-gray-400">${original_title}</h2>
        //     <p>${overview}</p>
        // </div>
        // </div>`;
    });
};

const renderSearchResults = (moviesArray) => {
    resultsCont.classList.remove('hidden');
    resultsCont.classList.add('flex');

    moviesArray.forEach((movie) => {
        const { poster_path, original_title } = movie;
        const card = document.createElement('div');
        card.className = 'flex p-4 bg-slate-300 rounded-lg';

        const figure = document.createElement('figure');
        figure.className = 'rounded-lg overflow-hidden h-24 w-24';
        const img = document.createElement('img');
        img.className = 'w-full';
        img.src = IMG_URL + poster_path;
        img.alt = original_title;
        figure.appendChild(img);

        const cardBody = document.createElement('div');
        cardBody.className = 'flex flex-col px-4 py-2 items-start ';
        const title = document.createElement('h2');
        title.className = 'text-4xl w-full border-b-2 mb-4 border-b-gray-400';
        title.textContent = original_title;
        const addToFav = document.createElement('button');
        addToFav.textContent = '☆ Add to favorites';
        addToFav.addEventListener('click', () => addToFavs(movie));

        cardBody.appendChild(title);
        cardBody.appendChild(addToFav);

        card.appendChild(figure);
        card.appendChild(cardBody);

        resultsCont.appendChild(card);
    });
};

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWI1OTkzY2VjYTIwOTkwOWI5NWI0ODJmODVjNDlmMCIsIm5iZiI6MTcyNzcwNTE3Mi42NDA2NDMsInN1YiI6IjY2ZmFhZjAyM2EwZjVhMDhjOGYxOGYzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JILLUNBjQwItAiLtLcP4FdjW4st_bKAdMsGxw253X-0',
    },
};

const getMovies = async () => {
    const res = await fetch(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        options
    );

    const data = await res.json();
    console.log(data);
    return data.results;
};

const getSearchResults = async (query) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1`,
        options
    );

    const data = await res.json();
    console.log(data);
    return data.results;
};

getMovies().then((movies) => renderMovies(movies));

window.addEventListener('click', (e) => {
    if (!e.target.matches('#results-container')) {
        resultsCont.innerHTML = '';
        resultsCont.classList.remove('flex');
        resultsCont.classList.add('hidden');
    }
});

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchInput = document.querySelector('#search-input');
    if (!searchInput.value) return;

    const results = await getSearchResults(searchInput.value);

    renderSearchResults(results);
});

// fetch(
//     'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
//     options
// )
//     .then((res) => res.json())
//     .then((data) => renderMovies(data.results))
//     .catch((err) => console.error(err));
