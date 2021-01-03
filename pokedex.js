/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const pokemonsURL = 'https://pokeapi.co/api/v2/pokemon/?limit=9999';
const specificPokemon = 'https://pokeapi.co/api/v2/pokemon/';
const $pokemonImg = document.querySelector('#pokemon-img');
const $pokemonAbilities = document.querySelector('#pokemon-abilities-list');
const $pokemonName = document.querySelector('#pokemon-name');
const $pokemonBaseXP = document.querySelector('#pokemon-base-xp');
const $pokemonWeight = document.querySelector('#pokemon-weight');
const $errorAlert = document.querySelector('.alert-danger');
const $pokemonSearch = document.querySelector('#selected-pokemon');
let languageNumber = 7;

function clearAbilities() { $pokemonAbilities.innerHTML = ''; }

async function specificPokemonData(pokemonName) {
  const response = await fetch(specificPokemon + pokemonName);
  const responseJSON = await response.json();
  return responseJSON;
}

function selectedLanguage() {
  return $('.language-select')[0].parentElement.innerText.trim();
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
    $($errorAlert).text('Asegurese de ingresar un pokemon válido.');
    languageNumber = 5;
  } else if (newLanguage === 'English') {
    $('#welcome').text('Type your favorite Pokemon!');
    $('#general-info-button').text('General Information');
    $('#abilities-h3').text('Abilities');
    $('#abilities-button').text('Abilities');
    // $("#items-h3") remains unchanged
    $('#pokemon-name-h3').text('Name');
    $('#pokemon-base-xp-h3').text('Base XP');
    $('#pokemon-weight-h3').text('Weight');
    $($errorAlert).text('Make sure to enter a valid pokemon.');
    languageNumber = 7;
  }
  $('#search-pokemon').click(); // reload search in the new language
}

function updatePokemonInfo(element, newText) {
  element.textContent = newText;
}
function updatePokemonImg(element, newSrc) {
  element.src = newSrc;
}

function updateAbilities(element, abilitiesList) {
  abilitiesList.forEach((abilityObject) => {
    console.log(abilityObject);
    console.log(`url: ${abilityObject.ability.url}`);

    fetch(abilityObject.ability.url)
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON.names);
        console.log(responseJSON.names[languageNumber].name);
        $(element).append($('<li/>').text(responseJSON.names[languageNumber].name).attr('class', 'list-group-item'));
      });
  });
}

function loadSearchEngine() {
  fetch(pokemonsURL)
    .then((response) => response.json())
    .then((responseJSON) => {
      const pokemonNames = [];

      responseJSON.results.forEach((pokemon) => {
        pokemonNames.push(pokemon.name);
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

function clearPokemonInfo() {
  updatePokemonInfo($pokemonName, '');
  updatePokemonInfo($pokemonBaseXP, '');
  updatePokemonInfo($pokemonWeight, '');
}

function clearPokemonImg() {
  updatePokemonImg($pokemonImg, 'mystery.png');
}

function toggleFailure() {
  $errorAlert.style.visibility = 'visible';
  $pokemonSearch.style.borderColor = 'red';
}
function clearAlert() {
  $errorAlert.style.visibility = 'hidden';
  $pokemonSearch.style.borderColor = '';
}

setTimeout(() => {
  $('.bootstrap-select').on('click', (e) => {
    e.preventDefault();
    console.log('click');
    changeLanguage(selectedLanguage());
  });
}, 100);

$('#myList a').on('click', function (e) {
  e.preventDefault();
  $(this).tab('show');
});

$('#search-pokemon').on('click', (e) => {
  e.preventDefault();
  clearAbilities();
  clearPokemonInfo();
  clearPokemonImg();
  clearAlert();
  console.log(` ${$('#selected-pokemon')[0].value} `);
  const selectedPokemon = $('#selected-pokemon')[0].value;

  specificPokemonData(selectedPokemon).then((pokemonJSON) => {
    updatePokemonInfo($pokemonName, pokemonJSON.name);
    updatePokemonInfo($pokemonBaseXP, pokemonJSON.base_experience);
    updatePokemonInfo($pokemonWeight, pokemonJSON.weight);
    updatePokemonImg($pokemonImg, pokemonJSON.sprites.front_default);
    updateAbilities($pokemonAbilities, pokemonJSON.abilities);
  })
    .catch(() => {
      toggleFailure();
    });
});

$(() => {
  $('.selectpicker').selectpicker();
});

// Execute

loadSearchEngine();
