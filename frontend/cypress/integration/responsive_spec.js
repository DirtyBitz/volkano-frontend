describe('Responsive layout', () => {
  beforeEach(() => {
    cy.viewport(500, 693)
  })

  describe('hamburger button', () => {
    context('when unauthorized', () => {
      beforeEach(() => {
        cy.visit('/')
      })

      it('has a button that redirects to sign up', () => {
        cy.get('#burger-nav').click()
        cy.contains('Sign Up').click()
        cy.url().should('contain', 'signup')
      })

      it('has a button that redirects to sign in', () => {
        cy.get('#burger-nav').click()
        cy.contains('Sign In').click()
        cy.url().should('contain', 'signin')
      })
    })

    context('when authorized', () => {
      beforeEach(() => {
        cy.login()
      })

      it('has a button that redirects to profile', () => {
        cy.get('#burger-nav').click()
        cy
          .get('.dropdown-menu')
          .contains(/profile/i)
          .click()
        cy.url().should('contain', 'profile')
      })

      it('has a button that sign out the user', () => {
        cy
          .get('#burger-nav')
          .click()
          .then(() => {
            cy
              .get('.dropdown-menu')
              .contains(/sign out/i)
              .click()
          })
          .then(() => {
            cy.visit('/profile')
            cy.url().should('contain', 'signin')
          })
      })
    })
  })
})
