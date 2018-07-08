//@ts-nocheck
const timestamp = Cypress.moment().format('x')

describe('Collection', () => {
  const testUser = `test${timestamp}@example.com`
  const title = 'Timestamped: ' + timestamp
  const url = 'http://maxjohansen.com/image.jpg'
  const tags = 'test, tags'

  beforeEach(() => {
    cy.reset_user(testUser)
    cy.login(testUser)
    cy.visit('/')
  })

  it('can add an item', () => {
    cy.get('#add-item').click()
    cy.get('input[name=url]').type(url)
    cy.get('input[name=title]').type(title)
    cy.get('input[name=tags]').type(tags + '{enter}')
    cy.url().should('equal', 'http://localhost:3000/')
    cy.get('#collage').contains(timestamp)
  })

  it('can add an item through bookmarklet', () => {
    const queryParams = encodeURI(`url=${url}&title=${title}&tags=${tags}`)
    cy.visit('/additem?' + queryParams)
    cy.get('button[type=submit]').click()
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

    // Backend validations
    cy.contains(/invalid url/i)
    cy.get('input[name=url]').type('{selectall}http://example.com/image.jpg')
    cy.contains(/invalid url/i).should('not.exist')
  })
})
