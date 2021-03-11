/* eslint-disable no-undef */
const URL = 'localhost:8080';
const POKEMON_NAME = 'pikachu';
const pokemonAPI = 'https://pokeapi.co/api/v2/pokemon/';

describe('Pokedex', () => {
  let fetchPolyfill;

  beforeEach(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

    cy.request(polyfillUrl)
      .then((response) => {
        fetchPolyfill = response.body;
      });
    cy.visit('localhost:8080', {
      onBeforeLoad(contentWindow) {
        // eslint-disable-next-line no-param-reassign
        delete contentWindow.fetch;
        contentWindow.eval(fetchPolyfill);
        // eslint-disable-next-line no-param-reassign
        contentWindow.fetch = contentWindow.unfetch;
      } });
      cy.wait(100);
  });
  it('search a valid pokemon and get a response displayed', () => {
    cy.server();
    cy.route(pokemonAPI + POKEMON_NAME, `fixture:${POKEMON_NAME}`).as('getPokemon');

    cy.get('#selected-pokemon').click({ force: true }).type(POKEMON_NAME);
    cy.get('#search-pokemon').click({ force: true });
    cy.get('#pokemon-name').contains(POKEMON_NAME);
  });
  it('search an non existing pokemon and get an alert and a red border', () => {
    cy.get('#selected-pokemon').click({ force: true }).type('mario bros');
    cy.get('#search-pokemon').click({ force: true });
    cy.get('.alert-danger').should('have.css', 'visibility', 'visible');
    cy.get('#selected-pokemon').should('have.css', 'borderColor', 'rgb(255, 0, 0)');
  });
  it('language changes succesfully when selected from the dropdown bar', () => {
    const englishPosition = 1;
    const spanishPosition = 2;
    const spanishWelcomeMessage = 'Ingresa tu pokemon preferido!';
    const englishWelcomeMessage = 'Type your favorite Pokemon!';
    cy.get('.language-select').click();
    cy.get('.language-select').eq(spanishPosition).click();
    cy.get('#welcome').contains(spanishWelcomeMessage);
    cy.get('.language-select').eq(0).click();
    cy.get('.language-select').eq(englishPosition).click();
    cy.get('#welcome').contains(englishWelcomeMessage);
  });
  it('select second pokemon from the dropdown menu and get a response displayed', () => {
    let pokemonSelectedName;
    cy.get('#selected-pokemon').click({ force: true }).type(POKEMON_NAME.slice(0, 3)).blur();
    cy.wait(100);
    cy.get('.tt-selectable').eq(1).then((selectable) => {
      pokemonSelectedName = selectable.text();
      cy.get('.tt-selectable').eq(1).click({ force: true });
      cy.get('#search-pokemon').click({ force: true });
      cy.get('#pokemon-name').contains(pokemonSelectedName);
    });
  });
  it('select valid pokemon and picture changes', () => {
    const originalPicture = Cypress.$('#pokemon-img').attr('src');
    cy.get('#selected-pokemon').click({ force: true }).type(POKEMON_NAME);
    cy.get('#search-pokemon').click({ force: true });
    cy.get('#pokemon-img').should('not.have.attr', 'src', originalPicture);
  });
  it('search pokemon and then search for another', () =>{
    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/metapod', 'fixture:metapod').as('getMetapod');

    cy.get('#selected-pokemon').click({ force: true }).type('metapod');
    cy.get('#search-pokemon').click({ force: true });
    cy.get('#pokemon-name').contains('metapod');

  });

});