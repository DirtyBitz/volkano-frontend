//@ts-nocheck
describe('Navigation', () => {
  context('as a user who is signed in', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/')
    })

    it('has collection on home page', () => {
      cy
        .get('#collage')
        .children()
        .should('exist')
    })

    it('can view profile page', () => {
      cy.contains(/@example\.com/i).click()
      cy.url().should('match', /profile/i)
    })
  })
})
