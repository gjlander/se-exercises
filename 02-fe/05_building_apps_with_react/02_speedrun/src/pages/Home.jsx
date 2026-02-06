import { useEffect, useState } from 'react';

import { getPopularMovies } from '../data';
import { MovieCard } from '../components';

const Home = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const popMovies = await getPopularMovies(abortController);
        console.log(popMovies);

        setMovies(popMovies);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.info('Fetch aborted');
        } else {
          console.error(error);
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div className='mx-auto w-full'>
      <h1 className='text-center my-4 text-6xl'>React Movie Diary</h1>
      <div className='p-4 grid grid-cols-[repeat(auto-fill,minmax(24rem,1fr))]  gap-6 justify-center'>
        {movies.map(movie => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
