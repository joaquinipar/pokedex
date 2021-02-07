export const specificPokemon = 'https://pokeapi.co/api/v2/pokemon/';

export async function fetchInfo(URL) {
  const response = await fetch(URL);
  const responseJSON = await response.json();
  return responseJSON;
}

export async function specificPokemonData(pokemonName) {
  const response = await fetch(specificPokemon + pokemonName);
  const responseJSON = await response.json();
  return responseJSON;
}
