//@ts-nocheck
const timestamp = Cypress.moment().format('x')

describe('Authentication', () => {
  context('a first time visitor', () => {
    it('can sign up for an account', () => {
      cy.visit('/')
      cy.contains(/sign up/i).click()
      cy.get('input[name=email]').type(`test${timestamp}@example.com`)
      cy.get('input[name=password]').type('password123')
      cy.get('input[name=passwordConfirmation]').type('password123{enter}')
      cy.should('not.contain', 'error')
      cy.contains(/account created/i)
      cy.contains(/confirmation email/i)
    })
  })

  context('someone who is not logged in', () => {
    it('should be redirected to signin when trying to view profile', () => {
      cy.visit('/profile')
      cy.url().should('match', /signin/i)
    })
  })
})
