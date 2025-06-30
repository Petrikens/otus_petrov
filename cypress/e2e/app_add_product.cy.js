describe('Логин и добавление продукта', () => {
  it('Проходит весь flow: логин → добавление продукта → редирект', () => {
    cy.visit('/login')

    cy.get('[data-testid="login-username"]').type('testuser')
    cy.get('[data-testid="login-password"]').type('password123')
    cy.get('[data-testid="login-submit"]').click()

    cy.url().should('include', '/')

    cy.visit('/add-product')

    cy.get('input[name="title"]').type('New product')
    cy.get('input[name="price"]').type('99.99')
    cy.get('textarea[name="description"]').type('Test description')
    cy.get('input[name="category"]').type('test-category')

    cy.get('form').submit()

    cy.url().should('include', '/')
  })
})
