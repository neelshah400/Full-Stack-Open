describe('Note app', function() {

  const user = {
    name: 'User 1',
    username: 'user1',
    password: 'password1'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2021')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#usernameInput').type(user.username)
    cy.get('#passwordInput').type(user.password)
    cy.get('#loginButton').click()
    cy.contains(`${user.name} logged in`)
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#usernameInput').type(user.username)
    cy.get('#passwordInput').type('WrongPassword')
    cy.get('#loginButton').click()
    cy.get('.error')
      .should('contain', 'Wrong Credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', `${user.name} logged in`)
  })

  describe('when logged in', function() {

    beforeEach(function() {
      cy.login(user)
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and several notes exists', function() {

      beforeEach(function() {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can can be made important', function() {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })

    })

  })

})