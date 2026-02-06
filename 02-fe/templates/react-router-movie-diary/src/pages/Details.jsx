import { useState } from 'react';
import { IMG_URL } from '../data/tmdb';
const demoMovie = {
    adult: false,
    backdrop_path: '/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg',
    belongs_to_collection: {
        id: 720879,
        name: 'Sonic the Hedgehog Collection',
        poster_path: '/fwFWhYXj8wY6gFACtecJbg229FI.jpg',
        backdrop_path: '/l5CIAdxVhhaUD3DaS4lP4AR2so9.jpg',
    },
    budget: 122000000,
    genres: [
        {
            id: 28,
            name: 'Action',
        },
        {
            id: 878,
            name: 'Science Fiction',
        },
        {
            id: 35,
            name: 'Comedy',
        },
        {
            id: 10751,
            name: 'Family',
        },
    ],
    homepage: 'https://www.sonicthehedgehogmovie.com',
    id: 939243,
    imdb_id: 'tt18259086',
    origin_country: ['US'],
    original_language: 'en',
    original_title: 'Sonic the Hedgehog 3',
    overview:
        'Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.',
    popularity: 4770.711,
    poster_path: '/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg',
    production_companies: [
        {
            id: 4,
            logo_path: '/gz66EfNoYPqHTYI4q9UEN4CbHRc.png',
            name: 'Paramount Pictures',
            origin_country: 'US',
        },
        {
            id: 333,
            logo_path: '/5xUJfzPZ8jWJUDzYtIeuPO4qPIa.png',
            name: 'Original Film',
            origin_country: 'US',
        },
        {
            id: 77884,
            logo_path: '/dP2lxVNctD5Cried0IWVqgrO2o9.png',
            name: 'Marza Animation Planet',
            origin_country: 'JP',
        },
        {
            id: 113750,
            logo_path: '/A3QVZ9Ah0yI2d2GiXUFpdlbTgyr.png',
            name: 'SEGA',
            origin_country: 'JP',
        },
        {
            id: 10644,
            logo_path: '/ocLZIdYJBppuCt1rhYEb2jbpt5F.png',
            name: 'Blur Studio',
            origin_country: 'US',
        },
        {
            id: 168701,
            logo_path: '/vWdZFT4V64CCv12D10m44duQjyg.png',
            name: 'SEGA of America',
            origin_country: 'US',
        },
    ],
    production_countries: [
        {
            iso_3166_1: 'US',
            name: 'United States of America',
        },
        {
            iso_3166_1: 'JP',
            name: 'Japan',
        },
    ],
    release_date: '2024-12-19',
    revenue: 446414362,
    runtime: 110,
    spoken_languages: [
        {
            english_name: 'English',
            iso_639_1: 'en',
            name: 'English',
        },
    ],
    status: 'Released',
    tagline: 'Try to keep up.',
    title: 'Sonic the Hedgehog 3',
    video: false,
    vote_average: 7.8,
    vote_count: 1359,
};

const Details = () => {
    //replace with single movie fetched from TMDB
    //use the dynamic part of the route to retrieve the id
    const [currMovie, setCurrMovie] = useState(demoMovie);

    console.log(currMovie);
    const { original_title, poster_path, tagline, overview, genres } =
        currMovie;

    if (!currMovie) {
        return <div>Sorry, no movie found</div>;
    }
    return (
        <div>
            <div className='hero bg-base-200 min-h-[50vh]'>
                <div className='hero-content flex-col lg:flex-row'>
                    <img
                        src={IMG_URL + poster_path}
                        className='max-w-sm rounded-lg shadow-2xl'
                    />
                    <div>
                        <h1 className='text-5xl font-bold mb-2'>
                            {original_title}
                        </h1>
                        <h2 className='text-3xl indent-4 mb-4'>{tagline}</h2>
                        <p className='mb-6'>{overview}</p>
                        <div>
                            <h3 className='font-bold'>Genres: </h3>
                            <ul className='list-disc ml-8'>
                                {genres?.map((genre) => (
                                    <li key={genre.id}>{genre.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
