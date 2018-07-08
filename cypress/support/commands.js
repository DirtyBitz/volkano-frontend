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

const backendUrl = Cypress.config('baseUrl').replace('3000', '5000')

Cypress.Commands.add('login', (login = 'test@example.com', password = 'password') => {
  Cypress.log({
    name: 'login',
    message: login + ' | ' + password,
  })
  cy
    .request({
      url: `${backendUrl}/auth/sign_in`,
      body: { login, password },
      method: 'POST',
      log: false,
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

Cypress.Commands.add('reset_user', (email = 'test@example.com') => {
  Cypress.log({
    name: 'reset user',
    message: email,
  })
  cy.request({
    url: `${backendUrl}/fixtures`,
    body: { email },
    method: 'POST',
    log: false,
  })
})

Cypress.Commands.add('logout', () => {
  cy.getCookie('session', { log: false }).then(cookie => {
    if (!cookie) {
      Cypress.log({ name: 'error', message: 'tried to log out without session' })
      return
    }
    const {
      user: { email },
    } = JSON.parse(decodeURI(cookie.value))
    Cypress.log({ name: 'logout', message: 'logged out ' + email })
    cy.clearCookie('session', { log: false })
  })
})
