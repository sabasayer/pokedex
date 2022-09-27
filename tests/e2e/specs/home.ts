describe("Home Test", () => {
  it("shoduld render pokemon cards", () => {
    cy.interceptPokemonList(5);

    cy.visit("/");
    cy.get("img").should("have.attr", "src", "/img/logo.6f411afc.png");
    cy.contains("a", "Home").should("have.attr", "href", "/");
    cy.contains("a", "Favorites").should("have.attr", "href", "/favorites");

    cy.get(".pokemon-card").should("have.length", 5);
  });

  it("should filter pokemons", () => {
    cy.interceptPokemonList(5);

    cy.visit("/");
    cy.get("input").type("test1");

    cy.get(".pokemon-card").should("have.length", 1);
    cy.get(".pokemon-card").contains("test1");
  });
});
