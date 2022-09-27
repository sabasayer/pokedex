// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { Pokemon, ServiceListResponse } from "../../../src/service/types";

const interceptPokemonRequest = (id: number) => {
  const pokemon: Pokemon = {
    id,
    name: `test${id}`,
    sprites: {
      front_default: "test.png",
    },
  };

  cy.intercept(
    {
      method: "GET",
      url: `https://mocktest.com/${id}/`,
    },
    pokemon
  ).as("getPokemnsById");
};

Cypress.Commands.add("interceptPokemonList", (pokemonAmount: number) => {
  const results = [];

  for (let i = 0; i < pokemonAmount; i++) {
    results.push({ name: "test", url: `https://mocktest.com/${i + 1}/` });
    interceptPokemonRequest(i + 1);
  }

  const response: ServiceListResponse = {
    count: pokemonAmount,
    next: "",
    previous: "",
    results,
  };

  cy.intercept(
    {
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon/*",
    },
    response
  ).as("getPokemns");
});
