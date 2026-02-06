import { useEffect, useState } from 'react';
import './index.css';
import { getPeople } from './data/starWars';

const App = () => {
  const [people, setPeople] = useState([]);
  const [url, setUrl] = useState('https://swapi.tech/api/people');
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPeople = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPeople(url, abortController);

        setPeople(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.info('Fetch aborted');
        } else {
          setError('Failed to fetch Pokémon.');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
    return () => {
      abortController.abort();
    };
  }, [url]);

  return (
    <main className='min-h-screen bg-gray-100 p-8 font-sans'>
      <div className='max-w-3xl mx-auto space-y-6'>
        <div className='flex justify-center gap-4 pt-6'>
          <button
            onClick={() => setUrl(prevUrl)}
            disabled={!prevUrl}
            className={`px-4 py-2 rounded ${
              prevUrl ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setUrl(nextUrl)}
            disabled={!nextUrl}
            className={`px-4 py-2 rounded ${
              nextUrl ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
        <h1 className='text-3xl font-bold text-center text-gray-800'>Star Wars Characters</h1>

        {loading && <p className='text-center text-gray-600 font-medium'>Loading...</p>}

        {error && <p className='text-center text-red-500 font-semibold'>{error}</p>}

        {!loading && !error && (
          <ul className='grid sm:grid-cols-2 gap-4'>
            {people.map(person => (
              <li key={person.uid} className='bg-white p-4 rounded shadow text-center capitalize'>
                <span className='font-semibold text-gray-800'>{person.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default App;
