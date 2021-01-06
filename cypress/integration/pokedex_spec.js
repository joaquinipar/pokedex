/* eslint-disable no-undef */
// import * as typeahead from '.node_modules\\corejs-typeahead\\dist\\typeahead.bundle.min.js';
const URL = 'localhost:8080';
const POKEMON_NAME = 'pikachu';

describe('Pokedex', () => {
  beforeEach(() => {
    cy.visit(URL);
    cy.wait(100);
  });
  it('search a valid pokemon and get a response displayed', () => {
    cy.get('#selected-pokemon').type(POKEMON_NAME);
    cy.get('#search-pokemon').click({ force: true });
    cy.get('#pokemon-name').contains(POKEMON_NAME);
  });
  it('search an non existing pokemon and get an alert and a red border', () => {
    cy.get('#selected-pokemon').type('mario bros');
    cy.get('#search-pokemon').click({ force: true });
    cy.get('.alert-danger').should('have.css', 'visibility', 'visible');
    cy.get('#selected-pokemon').should('have.css', 'borderColor', 'rgb(255, 0, 0)');
  });
});
