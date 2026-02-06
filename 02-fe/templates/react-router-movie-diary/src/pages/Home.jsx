import { useEffect, useState } from 'react';

import { getPopularMovies } from '../data/tmdb';
import MovieCard from '../components/MovieCard';

const Home = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        let ignore = false;
        (async () => {
            try {
                const popMovies = await getPopularMovies();
                console.log(popMovies);
                if (!ignore) {
                    setMovies(popMovies);
                }
            } catch (error) {
                console.error(error);
            }
        })();

        return () => {
            ignore = true;
        };
    }, []);
    return (
        <div className='mx-auto w-full'>
            <h1 className='text-center my-4 text-6xl'>React Movie Diary</h1>
            <div className='p-4 grid grid-cols-[repeat(auto-fill,minmax(24rem,1fr))]  gap-6 justify-center'>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                ))}
            </div>
        </div>
    );
};

export default Home;
