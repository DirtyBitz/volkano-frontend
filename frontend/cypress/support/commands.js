// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (login = 'test@example.com', password = 'password') => {
  Cypress.log({
    name: 'login',
    message: login + ' | ' + password,
  })
  cy
    .request({
      url: 'http://localhost:5000/auth/sign_in',
      body: { login, password },
      method: 'POST',
    })
    .then(({ headers, body }) => {
      const session = {
        client: headers.client,
        uid: headers.uid,
        token: headers.token,
        user: body.data,
      }
      cy.setCookie('session', JSON.stringify(session))
    })
})
