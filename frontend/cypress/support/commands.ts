/// <reference types="cypress" />
// ***********************************************
// This file can be used to create custom commands
// and overwrite existing commands.
//
// For more information on custom commands see:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command example:
Cypress.Commands.add('typeCorrectAnswer', (selector: string, correctAnswer: string) => {
  cy.get(selector).type(correctAnswer)
  cy.get('form').submit()
})

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to type correct answer and submit the form
       * @example cy.typeCorrectAnswer('input[type="text"]', 'Hello World')
       */
      typeCorrectAnswer(selector: string, correctAnswer: string): Chainable<Element>
    }
  }
} 
