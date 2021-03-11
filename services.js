export const specificPokemon = 'https://pokeapi.co/api/v2/pokemon/';

export async function fetchInfo(URL) {
  const response = await fetch(URL);
  const responseJSON = await response.json();
  return responseJSON;
}

export async function specificPokemonData(pokemonName) {
  try {
    const response = await fetch( JSON.parse( localStorage.getItem(pokemonName)).url );
    const responseJSON = await response.json();
    return responseJSON;
  }
  catch(e){
  const response = await fetch(specificPokemon + pokemonName);
  const responseJSON = await response.json();
  return responseJSON;
  }
}
