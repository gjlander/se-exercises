const fetchPokemon = async id => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  // console.log(data);
  return data;
};
let counter = 1;
const myInterval = setInterval(async () => {
  try {
    const { name, id } = await fetchPokemon(counter);
    const pokemon = { name, id };
    console.log(pokemon);

    counter++;
    if (counter > 150) clearInterval(myInterval);
  } catch (error) {
    console.error(error);
  }
}, 1000);
