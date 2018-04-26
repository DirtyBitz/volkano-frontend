//@ts-nocheck
describe('Navigation', () => {
  context('as a user who is signed in', () => {
    beforeEach(() => {
      cy.login()
    })

    it('has collection on home page', () => {
      cy
        .get('#collage')
        .children()
        .should('exist')
    })

    it('can view profile page', () => {
      cy.visit('/profile')
      cy.contains('@example.com').click()
      cy.get('#signout')
    })
  })
})
