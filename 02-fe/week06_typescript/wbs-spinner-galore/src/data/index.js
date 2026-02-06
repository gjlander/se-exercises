// Your data loaders go here
const loadPokemon = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0');
  if (!res.ok) throw new Error('Something went wrong while fetching data');
  const pokemon = res.json();

  return { pokemon };
};

export { loadPokemon };
