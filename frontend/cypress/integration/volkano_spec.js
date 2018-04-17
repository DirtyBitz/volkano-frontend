//@ts-nocheck
const timestamp = Cypress.moment().format('x')
const baseURL = 'http://localhost:3000'

const login = (username = 'test@example.com', password = 'password') => {
  // Sign in through UI to ensure VolkanoRequest-adapter is being used
  cy.visit(`${baseURL}/signin`)
  cy.get('input[name=login]').type(`${username}`)
  cy.get('input[name=password]').type(`${password}{enter}`)
  cy.url().should('contain', 'profile')
}

describe('Authentication', function() {
  context('a first time visitor', () => {
    it('can sign up for an account', () => {
      cy.visit(baseURL)
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
      cy.visit(`${baseURL}/profile`)
      cy.contains('@example.com').click()
      cy.get('#signout')
    })

    it('can view their collection', () => {
      cy.visit(`${baseURL}/collection`)
      cy.url().should('contain', 'collection')
      cy
        .get('#collage')
        .children()
        .should('exist')
    })
  })

  context('someone who is not logged in', () => {
    it('should be redirected to signin when trying to view collection', () => {
      cy.visit(`${baseURL}/collection`)
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

describe('Collection', () => {
  beforeEach(() => {
    login()
  })

  it('can add a new item to their collection', () => {
    cy.visit(`${baseURL}/collection`)
    cy.url().should('contain', 'collection')
    const time = Cypress.moment().format('x')
    cy.get('#collage').should('not.contain', time)
    cy.get('#add-item').click()
    cy.get('input[name=url]').type(`https://example.com/example${time}.jpg`)
    cy.get('input[name=title]').type(`example image of hotto doggu at ${time}`)
    cy.get('input[name=tags]').type('example, pic{enter}')

    cy.visit(`${baseURL}/collection`)
    cy.get('#collage').should('contain', time)
  })
})

describe('Hamburger Button when unauthorized', () => {
  beforeEach(() => {
    cy.visit(baseURL)
    cy.viewport(500, 693)
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
describe.only('Hamburger Button when authorized', () => {
  beforeEach(() => {
    cy.visit(baseURL)
    login()
    cy.viewport(500, 693)
  })

  it('has a button that redirects to collection', () => {
    cy.get('#burger-nav').click()
    cy
      .get('#dropdown-menu')
      .contains('Collection')
      .click()
    cy.url().should('contain', 'collection')
  })

  it('has a button that redirects to profile', () => {
    cy.get('#burger-nav').click()
    cy
      .get('#dropdown-menu')
      .contains('Profile')
      .click()
    cy.url().should('contain', 'profile')
  })

  it('has a button that sign out the user', () => {
    cy.get('#burger-nav').click()
    cy
      .get('#dropdown-menu')
      .contains('Sign Out')
      .click()
    cy.wait(500)
    cy.visit(`${baseURL}/collection`)
    cy.url().should('contain', 'signin')
  })
})
