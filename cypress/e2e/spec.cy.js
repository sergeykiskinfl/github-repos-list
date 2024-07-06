describe("tests", () => {
  it("input test", () => {
    cy.visit("/");

    cy.get('[data-cy="search-input"]').clear().type("chart", {
      delay: 300,
    });
  });

  it("pagination test", () => {
    cy.visit("/");
    cy.get('[data-cy="pagination-btn-2"]').click();
  });

  it("link test", () => {
    cy.visit("/");
    cy.get('[data-cy="link-to-description-1"]').click();
  });
});
