/// <reference types="cypress" />

describe("Sessions page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1337/conference");
    cy.get("h1").contains("View Sessions").click();
    cy.url().should("include", "/sessions");

    // Define aliases here
    cy.get("[data-cy=AllSessions").as("AllSessionsBtn");
    cy.get("[data-cy=Wednesday").as("WednesdayBtn");
    cy.get("[data-cy=Thursday").as("ThursdayBtn");
    cy.get("[data-cy=Friday").as("FridayBtn");
  });

  it("should navigate to conference sessions page and view day filter buttons", () => {
    // Validate that buttons to filter by day exist
    cy.get("@AllSessionsBtn");
    cy.get("@WednesdayBtn");
    cy.get("@ThursdayBtn");
    cy.get("@FridayBtn");
  });

  it("should filter sessions and only display Wednesday sessions when the Wednesday button is clicked", () => {
    cy.get("@WednesdayBtn").click();

    // Assertions
    cy.get("[data-cy=day").should("have.length", 21);
    cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
    cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
    cy.get("[data-cy=day]").contains("Friday").should("not.exist");
  });

  it("should filter sessions and only display Thursday sessions when the Thursday button is clicked", () => {
    cy.get("@ThursdayBtn").click();

    cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
    cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
    cy.get("[data-cy=day]").contains("Friday").should("not.exist");
  });

  it("should filter sessions and only display Friday sessions when the Friday button is clicked", () => {
    cy.get("@FridayBtn").click();

    cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
    cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
    cy.get("[data-cy=day]").contains("Friday").should("be.visible");
  });
});
