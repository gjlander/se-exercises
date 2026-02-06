import { Suspense } from 'react';
import { useLoaderData } from 'react-router';
import { Loading, PokemonCard } from '../components';

const PokemonList = () => {
  const { pokemon } = useLoaderData();

  return (
    <Suspense fallback={<Loading message='Loading Pokémon' />}>
      <PokemonCard promise={pokemon} />
    </Suspense>
  );
};

export default PokemonList;
