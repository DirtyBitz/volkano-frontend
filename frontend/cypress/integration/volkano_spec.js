//@ts-nocheck
const timestamp = Cypress.moment().format('x')
const baseURL = 'http://localhost:3000'

const login = () => {
  // Sign in through UI to ensure VolkanoRequest-adapter is being used
  cy.visit('http://localhost:3000/signin')
  cy.get('input[name=login]').type(`test@example.com`)
  cy.get('input[name=password]').type('password{enter}')
  cy.url().should('contain', 'profile')
}

describe('Authentication', function () {

  beforeEach(() => {
    cy.visit(baseURL)
  })

  context('a first time visitor', () => {
    it('can sign up for an account', () => {
      cy.contains('Sign up').click()
      cy.get('input[name=email]').type(`test${timestamp}@example.com`)
      cy.get('input[name=password]').type('password123')
      cy.get('input[name=passwordConfirmation]').type('password123{enter}')
      cy.should('not.contain', 'error')
    })
  })

  context('a user who is signed in', () => {
    beforeEach(() => {
      login()
    })

    it('can view profile page', () => {
      cy.request('/profile')
      cy.contains('@example.com').click()
      cy.contains('Sign out')
    })

    it('can view their collection', () => {
      cy.visit('http://localhost:3000/collection')
      cy.get('#collage').children().should('exist')
    })

    it('can change their password')
  })

  context('someone who is not logged in', () => {
    it('should be redirected to signin when trying to view collection', () => {
      cy.visit('http://localhost:3000/collection')
      cy.url().should('contain', 'signin')
    })
  })
})

describe('Front page', () => {
  beforeEach(() => {
    cy.visit(baseURL)
  })

  it('has Brand Name in page title', () => {
    cy.title().should('include', 'Volkano')
  })
})

describe('Collections', () => {
  beforeEach(() => {
    login()
  })

  describe('browsing', () => {
    it('has a grid displaying collected items')
    it('can switch to full-screen mode')
  })

  describe('searching', () => {
    it('shows cat pictures when searching for the word "cat"')
    it('shows images when searching for "image"')
    it('shows videos when searching for "video"')
  })

  describe('adding items', () => {
    it('adds an item to the collection', () => {
      const time = Cypress.moment().format('x')

      // Check that collection does not already contain
      cy.visit('http://localhost:3000/collection')
      cy.get('#collage').should('not.contain', time)
      cy.get('#add-item').click()
      cy.get('input[name=url]').type(`https://example.com/example${time}.jpg`)
      cy.get('input[name=title]').type(`${time}`)
      cy.get('input[name=tags]').type('example, pic{enter}')

      cy.request('/collection')
      cy.get('#collage').should('contain', `${time}`)
    })
  })
})
