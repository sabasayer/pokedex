describe("Home Test", () => {
  it("shoduld render favorited pokemon cards", () => {
    cy.interceptPokemonList(5);
    localStorage.setItem("favorites", JSON.stringify([2, 3]));

    cy.visit("/favorites");
    cy.get(".pokemon-card").should("have.length", 2);
    cy.get(".pokemon-card").contains("test2");
    cy.get(".pokemon-card").contains("test3");
  });
});
