import { Pokemon, ServiceListResponse } from "../../../src/service/types";

const interceptPokemonListRequesst = (amount: number) => {
  const results = [];

  for (let i = 0; i < amount; i++) {
    results.push({ name: "test", url: `https://mocktest.com/${i + 1}` });
    interceptPokemonRequest(i + 1);
  }

  const response: ServiceListResponse = {
    count: amount,
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
};

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
      url: `https://mocktest.com/${id}`,
    },
    pokemon
  ).as("getPokemnsById");
};

describe("Home Test", () => {
  it("shoduld render pokemon cards", () => {
    interceptPokemonListRequesst(5);

    cy.visit("/");
    cy.get("img").should("have.attr", "src", "/img/logo.6f411afc.png");
    cy.contains("a", "Home").should("have.attr", "href", "/");
    cy.contains("a", "Favorites").should("have.attr", "href", "/favorites");

    cy.get(".pokemon-card").should("have.length", 5);
  });

  it("should filter pokemons", () => {
    interceptPokemonListRequesst(5);

    cy.visit("/");
    cy.get("input").type("test1");

    cy.get(".pokemon-card").should("have.length", 1);
    cy.get(".pokemon-card").contains("test1");
  });
});
