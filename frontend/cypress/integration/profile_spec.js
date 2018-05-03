//@ts-nocheck
const timestamp = Cypress.moment().format('x')

describe('Profile page', () => {
  const testPassword = 'password'
  const testUser = `test${timestamp}@example.com`

  beforeEach(() => {
    cy.reset_user(testUser)
    cy.login(testUser, testPassword)
    cy.visit('/profile')
  })

  it('can change username', () => {
    cy
      .contains(/nickname/i)
      .siblings()
      .within(() => {
        cy.get('.icon').click()
      })
    cy.get('input').type('{selectall}Hugh Mungus')
    cy.get('.confirm-button').click()

    cy.contains(/^Hugh Mungus$/i)
  })

  it('can change password', () => {
    cy.contains(/current password/i).should('not.exist')
    cy.contains(/change password/i).click()
    cy.contains(/current password/i)
    cy.contains(/cancel/i).click()
    cy.contains(/current password/i).should('not.exist')

    cy.contains(/change password/i).click()

    cy
      .contains(/current password/i)
      .siblings('input')
      .type(testPassword)

    const newPassword = 'password1'
    cy
      .contains(/new password/i)
      .siblings('input')
      .type(newPassword)

    cy
      .contains(/confirm password/i)
      .siblings('input')
      .type(newPassword)

    cy.contains(/change password/i).click()
    cy.contains(/password changed/i)
    cy.get('#signout').click()
    cy.login(testUser, newPassword)
    cy.visit('/profile')
    cy.url().should('match', /profile/)
  })
})
