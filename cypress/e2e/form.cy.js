describe('Student Registration Form Automation', () => {

  beforeEach(() => {
    
    cy.visit('https://demoqa.com/automation-practice-form');

  });

  it('should completely fill out the student registration form and submit successfully', () => {
    
    cy.get('#firstName')
      .type('Jane')
      .should('have.value', 'Jane');

    cy.get('#lastName')
      .type('Doe')
      .should('have.value', 'Doe');

    cy.get('#userEmail')
      .type('jane.doe@example.com')
      .should('have.value', 'jane.doe@example.com');

   
    cy.get('input[type="radio"][value="Female"]')
      .check({ force: true })
      .should('be.checked');

    
    cy.get('#userNumber')
      .type('9876543210')
      .should('have.value', '9876543210');

    
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select('May');
    cy.get('.react-datepicker__year-select').select('2000');
    cy.get('.react-datepicker__day--015').not('.react-datepicker__day--outside-month').click();
    cy.get('#dateOfBirthInput').should('have.value', '15 May 2000');

  
    cy.get('#subjectsInput')
      .type('Computer Science{enter}')
      .type('Maths{enter}');

   
    cy.get('input[type="checkbox"]#hobbies-checkbox-2') 
      .check({ force: true })
      .should('be.checked');

    cy.get('input[type="checkbox"]#hobbies-checkbox-3') 
      .check({ force: true })
      .should('be.checked');

   
    cy.get('input[type="file"]#uploadPicture')
      .selectFile('cypress/fixtures/profile-avatar.jpg');

    
    cy.get('textarea#currentAddress')
      .type('789 Test Suite Boulevard, Suite 404, Tech City')
      .should('have.value', '789 Test Suite Boulevard, Suite 404, Tech City');

    
    cy.get('#state').click();
    cy.get('#state').find('div').contains('NCR').click({ force: true });

    
    cy.get('#city').click();
    cy.get('#city').find('div').contains('Delhi').click({ force: true });

    
    cy.get('button#submit').click({ force: true });

    
    cy.get('.modal-content', { timeout: 6000 })
      .should('be.visible');
      
    cy.get('#example-modal-sizes-title-lg')
      .should('have.text', 'Thanks for submitting the form');

    
    cy.get('.table-responsive').within(() => {
      cy.contains('td', 'Jane Doe').should('be.visible');
      cy.contains('td', 'jane.doe@example.com').should('be.visible');
      cy.contains('td', 'Female').should('be.visible');
      cy.contains('td', '9876543210').should('be.visible');
    });
  });
});
