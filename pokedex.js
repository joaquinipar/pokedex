/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import * as ui from './ui.js';
import { fetchInfo, specificPokemonData } from './services.js';

const pokemonsURL = 'https://pokeapi.co/api/v2/pokemon/?limit=9999';
const SpanishNumber = 5;
const EnglishNumber = 7;
let languageNumber = 7;

function setLanguageNumber(number) {
  languageNumber = number;
}

function changeLanguage(newLanguage) {
  if (newLanguage === 'Español') {
    $('#welcome').text('Ingresa tu pokemon preferido!');
    $('#general-info-button').text('Información General');
    $('#abilities-h3').text('Habilidades');
    $('#abilities-button').text('Habilidades');
    // $("#items-h3") remains unchanged
    $('#pokemon-name-h3').text('Nombre');
    $('#pokemon-base-xp-h3').text('Experiencia Base');
    $('#pokemon-weight-h3').text('Peso');
    $(ui.$errorAlert).text('Asegurese de ingresar un pokemon válido.');
    // $("#pokemon-hp-h3") remains unchanged
    $('#pokemon-attack-h3').text('Ataque');
    $('#pokemon-defense-h3').text('Defensa');
    $('#pokemon-special-attack-h3').text('Ataque Especial');
    $('#pokemon-speed-h3').text('Velocidad');
    setLanguageNumber(SpanishNumber);
  } else if (newLanguage === 'English') {
    $('#welcome').text('Type your favorite Pokemon!');
    $('#general-info-button').text('General Information');
    $('#abilities-h3').text('Abilities');
    $('#abilities-button').text('Abilities');
    // $("#items-h3") remains unchanged
    $('#pokemon-name-h3').text('Name');
    $('#pokemon-base-xp-h3').text('Base XP');
    $('#pokemon-weight-h3').text('Weight');
    $(ui.$errorAlert).text('Make sure to enter a valid pokemon.');
    // $("#pokemon-hp-h3") remains unchanged
    $('#pokemon-attack-h3').text('Attack');
    $('#pokemon-defense-h3').text('Defense');
    $('#pokemon-special-attack-h3').text('Special Attack');
    $('#pokemon-speed-h3').text('Speed');
    setLanguageNumber(EnglishNumber);
  }
  ui.clearAllInfo();
  // $('#search-pokemon').click(); // reload search in the new language
}

function selectedLanguage() {
  return $('.language-select')[0].parentElement.innerText.trim();
}

function updatePokemonItems(element, itemList) {
  itemList.forEach((itemObject) => {
    console.log(itemObject.item.url);
    fetchInfo(itemObject.item.url).then((item) => {
      const itemName = item.names[languageNumber].name;
      const itemImg = item.sprites.default;
      console.log(`nombre del item: ${itemName}`);
      console.log(`imagen del item ${itemImg}`);

      $(element).append(ui.createItemRow(itemName, itemImg));
    })
      .catch((error) => {
        console.error(error);
      });
  });
}

function updateAbilities(element, abilitiesList) {
  const itemClass = 'list-group-item';
  abilitiesList.forEach((abilityObject) => {
    fetchInfo(abilityObject.ability.url)
      .then((responseJSON) => {
        const abilityName = responseJSON.names[languageNumber].name;
        const newLi = $('<li/>');
        newLi.text(abilityName).attr('class', itemClass);
        $(element).append(newLi);
      });
  });
}

function loadSearchEngine() {
  fetchInfo(pokemonsURL)
    .then((responseJSON) => {
      const pokemonNames = [];

      responseJSON.results.forEach((pokemon) => {
        pokemonNames.push(pokemon.name);
        localStorage.setItem(pokemon.name , JSON.stringify(pokemon));
      });
      return pokemonNames;
    })
    .then((pokemonNames) => {
      $(document).ready(() => {
        // Constructing the suggestion engine
        const pokemones = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.whitespace,
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          local: pokemonNames,
        });

        // Initializing the typeahead
        $('.typeahead').typeahead({
          hint: true,
          highlight: true, /* Enable substring highlighting */
          minLength: 1, /* Specify minimum characters required for showing result */
        },
        {
          name: 'pokemones',
          source: pokemones,
        });
      });
    });
}

setTimeout(() => {
  $('.bootstrap-select').on('click', (e) => {
    console.log('click');
    changeLanguage(selectedLanguage());
    e.preventDefault();
  });
}, 100);

$('#myList a').on('click', function (e) {
  $(this).tab('show');
  e.preventDefault();
});

$('#search-pokemon').on('click', (e) => {
  e.preventDefault();
  ui.clearAllInfo();
  const selectedPokemon = $('#selected-pokemon')[0].value;
  specificPokemonData(selectedPokemon).then((pokemonJSON) => {
    ui.updatePokemonInfo(ui.$pokemonName, pokemonJSON.name);
    console.log(pokemonJSON.name);
    ui.updatePokemonInfo(ui.$pokemonBaseXP, pokemonJSON.base_experience);
    console.log(pokemonJSON.base_experience);
    ui.updatePokemonInfo(ui.$pokemonWeight, pokemonJSON.weight);
    console.log(pokemonJSON.weight);
    ui.updatePokemonImg(ui.$pokemonImg, pokemonJSON.sprites.front_default);
    console.log(pokemonJSON.sprites.front_default);
    updateAbilities(ui.$pokemonAbilities, pokemonJSON.abilities);
    console.log(pokemonJSON.abilities);
    updatePokemonItems(ui.$pokemonItems, pokemonJSON.held_items);
    console.log(pokemonJSON.held_items);
    ui.updatePokemonStats(pokemonJSON.stats);
  })
    .catch((error) => {
      console.error(error);
      ui.toggleFailure();
    });
});

$(() => {
  $('.selectpicker').selectpicker();
});

// Execute

loadSearchEngine();
