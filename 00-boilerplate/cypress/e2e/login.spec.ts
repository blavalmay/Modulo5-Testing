describe('Login specs', () => {
  it('visit the login page', () => {
    cy.visit('/login');
  });

  it('should focus user input when clicking on it', () => {
    // Act
    cy.visit('/login');
    cy.findByRole('textbox').click();

    // Assert
    cy.findByRole('textbox').should('have.focus');
  });

  it('should show error message when submitting empty fields', () => {
    // Arrange

    // Act
    cy.visit('/login');
    cy.findByRole('button', { name: 'Login' }).click();

    // Assert
    cy.findAllByText('Debe informar el campo').should('exist');
  });

  it('should show alert error message when submitting wrong credentials', () => {
    // Arrange
    const user = 'admin';
    const password = 'admin';

    // Act
    cy.visit('/login');
    cy.findByLabelText('Usuario *').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();

    // Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.findByText('Usuario y/o password no válidos').should('exist');
  });

  it('should navigate to home list when submitting right credentials', () => {
    // Arrange
    const user = 'admin';
    const password = 'test';

    // Act
    cy.visit('/login');
    cy.findByLabelText('Usuario *').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();

    // Assert
    cy.url().should('equal', 'http://localhost:5173/#/submodule-list');
  });
});
