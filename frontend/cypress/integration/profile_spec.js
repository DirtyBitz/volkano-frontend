//@ts-nocheck
const timestamp = Cypress.moment().format('x')

describe('Profile page', () => {
  const testPassword = 'password'

  beforeEach(() => {
    cy.login('test@test.com', testPassword)
    cy.visit('/profile')
  })

  it('can cancel password change', () => {
    cy
      .get('.button')
      .contains('Change password')
      .click()

    cy
      .get('.button')
      .contains('Cancel')
      .click()
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

    cy.contains('Hugh Mungus')
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

    cy.get('#signout').click()
    cy.login('test@test.com', newPassword)
    cy.visit('/profile')
    cy.url().should('contain', 'profile')
  })
})
