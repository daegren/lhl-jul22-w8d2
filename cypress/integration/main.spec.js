/// <reference types="Cypress" />

context("Main", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000");
  });

  it("loads the page", () => {
    cy.get(".search__form input:first").should(
      "have.attr",
      "placeholder",
      "Search Artists"
    );

    cy.get(".filters__form")
      .find(".filters__form-group")
      .as("filterList")
      .should("have.length", 5);

    cy.get("@filterList")
      .find('input[type="checkbox"]')
      .not("[checked]")
      .should("have.length", 2);
  });

  it("searches for an album", () => {
    cy.get(".search__form input:first")
      .type("Daft Punk", { delay: 500 })
      .should("have.value", "Daft Punk");

    cy.get(".search__form .spinner").should("not.be", null);

    cy.wait(300);

    cy.get(".album")
      .as("albums")
      .should("have.length", 13);

    cy.get('.filters__checkbox[name="Explicit"]').uncheck();

    cy.get("@albums").should("have.length", 12);
  });
});
