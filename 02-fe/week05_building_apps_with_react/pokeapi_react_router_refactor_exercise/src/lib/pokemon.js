const fetchAllPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
    const data = await res.json();
    const pokemon = data.results;

    const pokeWithSprite = pokemon.map((poke, i) => ({
        ...poke,
        // use default_front sprite URL so we can have an image
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            i + 1
        }.png`,
        //arrays are zero indexed, and pokemon numbering starts at 1, so id of i + 1 gives us the right pokemon
        id: i + 1,
    }));

    return pokeWithSprite;
};

const fetchSinglePokemon = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    return data;
};

export { fetchAllPokemon, fetchSinglePokemon };
