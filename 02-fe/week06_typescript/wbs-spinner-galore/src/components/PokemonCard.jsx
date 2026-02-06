import { use } from 'react';

const PokemonCard = ({ promise }) => {
  const { results } = use(promise);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4'>
      {results.map((pokemon, i) => (
        <div key={i + 1} className='card bg-base-100 shadow-xl'>
          <figure className='px-4 pt-4'>
            <img
              src={`https://github.com/PokeAPI/sprites/raw/master/sprites/pokemon/other/official-artwork/${i + 1}.png`}
              alt={pokemon.name}
              className='rounded-xl w-24 h-24'
            />
          </figure>
          <div className='card-body items-center text-center'>
            <h2 className='card-title capitalize'>{pokemon.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonCard;
