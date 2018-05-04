//@ts-nocheck
const timestamp = Cypress.moment().format('x')

describe('Collection', () => {
  const testUser = `test${timestamp}@example.com`
  beforeEach(() => {
    cy.reset_user(testUser)
    cy.login(testUser)
    cy.visit('/')
  })

  it('can add an item', () => {
    cy.get('#add-item').click()
    cy.get('input[name=url]').type('http://maxjohansen.com/image.jpg')
    cy.get('input[name=title]').type('Timestamped: ' + timestamp)
    cy.get('input[name=tags]').type('test, tags{enter}')
    cy.url().should('equal', 'http://localhost:3000/')
    cy.get('#collage').contains(timestamp)
  })

  it('has sensible error messages', () => {
    cy.get('#add-item').click()

    // URL must be present and valid
    cy.get('input[name=url]').type('{enter}')
    cy.contains(/url can't be blank/i)
    cy.get('input[name=url]').type('yoloswagballs{enter}')
    cy.contains(/url can't be blank/i).should('not.exist')
    // Title must be present
    cy.get('input[name=title]').type('{enter}')
    cy.contains(/title can't be blank/i)
    cy.get('input[name=title]').type('Great title{enter}')
    cy.contains(/title can't be blank/i).should('not.exist')

    // TODO: Look into these
    // Backend validations
    // cy.contains(/invalid url/i)
    // cy.get('input[name=url]').type('{selectall}http://example.com/image.jpg')
    // cy.contains(/invalid url/i).should('not.exist')
  })
})
