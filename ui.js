export const $pokemonImg = document.querySelector('#pokemon-img');
export const $pokemonAbilities = document.querySelector('#pokemon-abilities-list');
export const $pokemonName = document.querySelector('#pokemon-name');
export const $pokemonBaseXP = document.querySelector('#pokemon-base-xp');
export const $pokemonWeight = document.querySelector('#pokemon-weight');
export const $errorAlert = document.querySelector('.alert-danger');
export const $pokemonSearch = document.querySelector('#selected-pokemon');
export const $pokemonItems = document.querySelector('#pokemon-item-list');
export const $pokemonHP = document.querySelector('#pokemon-hp');
export const $pokemonAttack = document.querySelector('#pokemon-attack');
export const $pokemonDefense = document.querySelector('#pokemon-defense');
export const $pokemonSpecialAttack = document.querySelector('#pokemon-special-attack');
export const $pokemonSpeed = document.querySelector('#pokemon-speed');
export const pokemonStatsElements = [$pokemonHP, $pokemonAttack, $pokemonDefense,
  $pokemonSpecialAttack, $pokemonSpeed];

export function clearAbilities() { $pokemonAbilities.innerHTML = ''; }

export function updatePokemonInfo(element, newText) {
  element.textContent = newText;
}
export function updatePokemonImg(element, newSrc) {
  element.src = newSrc;
}
export function createItemRow(itemName, itemImg) {
  const newRow = $('<div/>').addClass('row');
  const newDiv1 = $('<div/>').addClass('col-sm-6');
  const newImg = $('<img/>').attr('src', itemImg);
  const newDiv2 = $('<div/>').addClass('col-sm-6');
  const newItemText = $('</p>').text(itemName);
  newDiv1.append(newImg);
  newDiv2.append(newItemText);
  newRow.append(newDiv1);
  newRow.append(newDiv2);
  return newRow;
}

export function clearStatsInfo() {
  updatePokemonInfo($pokemonHP, '');
  updatePokemonInfo($pokemonAttack, '');
  updatePokemonInfo($pokemonDefense, '');
  updatePokemonInfo($pokemonSpecialAttack, '');
  updatePokemonInfo($pokemonSpeed, '');
}

export function clearPokemonInfo() {
  updatePokemonInfo($pokemonName, '');
  updatePokemonInfo($pokemonBaseXP, '');
  updatePokemonInfo($pokemonWeight, '');
}

export function clearPokemonImg() {
  updatePokemonImg($pokemonImg, 'mystery.png');
}

export function toggleFailure() {
  $errorAlert.style.visibility = 'visible';
  $pokemonSearch.style.borderColor = 'rgb(255, 0, 0)'; // red
}
export function clearAlert() {
  $errorAlert.style.visibility = 'hidden';
  $pokemonSearch.style.borderColor = '';
}
export function clearItem() {
  $pokemonItems.innerHTML = '';
}
export function updatePokemonStats(statsList) {
  pokemonStatsElements.forEach((element, index) => {
    element.textContent = statsList[index].base_stat;
  });
}
export function clearAllInfo() {
  clearAbilities();
  clearStatsInfo();
  clearPokemonInfo();
  clearPokemonImg();
  clearAlert();
  clearItem();
}
