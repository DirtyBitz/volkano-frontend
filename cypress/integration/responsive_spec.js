describe('Responsive layout', () => {
  beforeEach(() => {
    cy.viewport(500, 600)
  })

  describe('hamburger button', () => {
    context('when unauthorized', () => {
      beforeEach(() => {
        cy.clearCookies()
        cy.visit('/')
        cy.get('#burger-nav').click()
      })

      it('has links to sign in and sign up', () => {
        cy.get('.dropdown-menu').within(() => {
          cy.contains(/sign in/i)
          cy.contains(/sign up/i)
        })
      })
    })

    context('when authorized', () => {
      beforeEach(() => {
        cy.login()
        cy.visit('/')
        cy.wait(250)
        cy.get('#burger-nav').click()
      })

      it('has links to profile, add item and sign out', () => {
        cy.get('.dropdown-menu').within(() => {
          cy.contains(/profile/i)
          cy.contains(/add(.*)? item/i)
          cy.contains(/sign out/i)
        })
      })
    })
  })
})
