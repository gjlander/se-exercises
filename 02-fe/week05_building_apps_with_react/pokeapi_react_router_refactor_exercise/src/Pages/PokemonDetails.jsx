import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSinglePokemon } from '../lib/pokemon';
import PokemonCard from '../components/PokemonCard';

const PokemonDetails = () => {
    const [currPokemon, setCurrPokemon] = useState();
    const { id } = useParams();
    useEffect(() => {
        fetchSinglePokemon(id)
            .then((poke) => setCurrPokemon(poke))
            .catch((err) => console.error(err));
    }, [id]);
    return <div>{currPokemon && <PokemonCard {...currPokemon} />}</div>;
};

export default PokemonDetails;
