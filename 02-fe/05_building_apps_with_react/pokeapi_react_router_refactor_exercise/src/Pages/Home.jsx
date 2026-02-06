import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchAllPokemon } from '../lib/pokemon';
import PokemonCard from '../components/PokemonCard';

const Home = () => {
    const [allPokemon, setAllPokemon] = useState([]);
    useEffect(() => {
        fetchAllPokemon()
            .then((array) => setAllPokemon(array))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div className='p-4 grid grid-cols-6 gap-6'>
            {allPokemon.map((p) => (
                <Link key={p.id} to={`pokemon/${p.id}`}>
                    <PokemonCard {...p} />
                </Link>
            ))}
        </div>
    );
};

export default Home;
