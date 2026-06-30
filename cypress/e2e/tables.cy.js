describe('Web Table Manipulation and Validation Suite', () => {

  beforeEach(() => {
    
    cy.visit('https://practice.expandtesting.com/tables')
  });

  it('should validate row count, column count, read data, and interact with row elements', () => {
    
    cy.get('#table1 tbody tr')
      .should('have.length', 4); 

    cy.get('#table1 thead tr th')
      .should('have.length', 6); 

    cy.get('#table1 tbody tr').first().within(() => {
      
      cy.get('td').eq(0).should('have.text', 'Smith');
      cy.get('td').eq(1).should('have.text', 'John');
      cy.get('td').eq(2).should('have.text', 'jsmith@gmail.com');
    });

    
    cy.get('#table1 tbody tr')
      .contains('td', 'fbach@yahoo.com') 
      .closest('tr');                  
    

    const expectedFirstNames = ['John', 'Frank', 'Jason', 'Tim'];
    
    cy.get('#table1 tbody tr').each(($row, index) => {
      
      cy.wrap($row).find('td').eq(1).should('have.text', expectedFirstNames[index]);
    });
    
  });
});
