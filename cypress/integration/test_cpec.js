describe('request fo quotation', () => {
  it('should open the page', () => {
    cy.visit('localhost:8001/zapytania-ofertowe');
    cy.get('h1').should('contain', 'Zapytanie ofertowe');
  });
  it('should load default 5 products', () => {
    cy.get('.quotation-products__row').should('have.length', 5);
  });
  it('should prefill product from storage', () => {
    cy.get('input[name="productNr"]').first().type('123456');
    cy.get('input[name="producerNr"]').first().type('YDK3324');
    cy.get('input[name="brand"]').first().type('Cypress.io');
    cy.get('input[name="price"]').first().type('249');
    cy.get('input[name="productNr"]').first().click(); // To trigger blur on last input

    cy.reload();

    cy.get('input[name="productNr"]').first().should('have.value', '123456');
    cy.get('input[name="producerNr"]').first().should('have.value', 'YDK3324');
    cy.get('input[name="brand"]').first().should('have.value', 'Cypress.io');
    cy.get('input[name="price"]').first().should('have.value', '249');
  });
});
