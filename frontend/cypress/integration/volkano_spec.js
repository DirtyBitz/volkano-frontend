//@ts-nocheck
const timestamp = Cypress.moment().format('x')
const baseURL = 'http://localhost:3000'

describe.skip('Authentication', function() {
  beforeEach(() => {
    cy.visit(baseURL)
  })

  context('a first time visitor', () => {
    it('can sign up for an account', () => {
      cy.contains('Sign up').click()
      cy.get('input[name=email]').type(`test${timestamp}@example.com`)
      cy.get('input[name=password]').type('password123')
      cy.get('input[name=password-confirmation]').type('password123{enter}')
      cy.should('not.contain', 'error')
    })
  })

  context('a user who is signed in', function() {
    beforeEach(() => {
      cy.login('test@example.com', 'password').then(res => {
        cy.log(res.headers['access-token'])
      })
    })

    it('can view profile page', () => {
      cy.visit('http://localhost:3000/profile')
      cy.contains('@example.com').click()
      cy.contains('Sign out')
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

  // The nav bar is unit tested, should we just check that it
  // is rendered here and trust the unit tests have done their job?
  describe('the nav bar', () => {
    it('has link to home page', () => {
      cy.get('#home-link').should('contain', 'Home')
    })

    // TODO: should verify that clicking link leads to /signin
    it.skip('has link to sign in', () => {
      cy.get('#signin-link').should('contain', 'Sign in')
      cy.get('#signin-link').click()
      cy.url().should('contain', '/signin')
    })

    it.skip('has link to sign up', () => {
      cy.get('#signup-link').should('contain', 'Sign up')
      cy.contains('Sign up').click()
      cy.url().should('contain', '/signup')
    })
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
