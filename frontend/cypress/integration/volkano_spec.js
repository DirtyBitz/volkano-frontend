//@ts-nocheck
const timestamp = Cypress.moment().format('x')
const baseURL = 'http://localhost:3000'

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
      // Sign in through UI to ensure VolkanoRequest-adapter is being used
      cy.visit('http://localhost:3000/signin')
      cy.get('input[name=login]').type(`test@example.com`)
      cy.get('input[name=password]').type('password{enter}')
      cy.url().should('contain', 'profile')
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

describe.skip('Collections', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signin')
    cy.get('input[name=email]').type('test@example.com')
    cy.get('input[name=password]').type('password{enter}')
    cy.url().should.be('/')
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
})
