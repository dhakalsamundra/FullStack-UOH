describe('Blog app', function(){
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3002/api/test/reset')
        const user = {
            name: 'Cypress',
            username: 'AdminTest',
            password: 'AdminTest'
        }
        cy.request('POST', 'http://localhost:3002/api/users/', user)
        cy.visit('http://localhost:3000')
      })

    it('front page can be opened', () => {
        cy.contains('blogs')
    })
    it('valid user can be logged in', function () {
        cy.get('#togglable-btn').click()
        cy.get('#username').type('AdminTest')
        cy.get('#password').type('AdminTest')
        cy.get('#login-button').click()
    
        cy.contains('Cypress logged in')
      });
      it('login fails with invalid credentials', function () {
        cy.get('#togglable-btn').click()
        cy.get('#username').type('abcdefg')
        cy.get('#password').type('ijklmnop')
        cy.get('#login-button').click()
    
        cy.get('.error').and('contain','Invalid credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
        cy.get('html').should('not.contain', 'Cypress logged in')
      });
    
    describe('when logged in', function(){
        beforeEach(function(){
            cy.contains('Login').click()
            cy.get('#username').type('AdminTest')
            cy.get('#password').type('AdminTest')
            cy.get('#login-button').click()
          })
      
          it('a new blog can be created', function() {
            cy.contains('Add Blog').click()
            cy.get('#Title').type('Cypress');
            cy.get('#Author').type('Samundra');
            cy.get('#Url').type('abc.com');
            cy.get('#Likes').type(20);
            cy.get('#addblog-btn').click()
            cy.contains('Cypress')
          })
        })
    })