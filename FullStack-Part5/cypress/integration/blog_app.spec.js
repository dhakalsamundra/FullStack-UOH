describe('Blog app', function(){
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3002/api/test/reset')
        const user = {
            name: 'Cypress',
            username: 'Cypress',
            password: 'Cypress'
        }
        cy.request('POST', 'http://localhost:3002/api/users/', user)
        cy.visit('http://localhost:3000')
      })

    it('front page can be opened', () => {
        cy.contains('blogs')
    })
    it('valid user can be logged in', function () {
        cy.get('#togglable-btn').click()
        cy.get('#username').type('Cypress')
        cy.get('#password').type('Cypress')
        cy.get('#login-button').click()
    
        cy.contains('Samundra logged in')
      });
      it('login user can be logged in', function () {
        cy.get('#togglable-btn').click()
        cy.get('#username').type('abc')
        cy.get('#password').type('def')
        cy.get('#login-button').click()
    
        cy.contains('wrong credentials')
      });
    
    describe('when logged in', function(){
        beforeEach(function(){
            cy.contains('Login').click()
            cy.get('#username').type('Samundra')
            cy.get('#password').type('Samundra')
            cy.get('#login-button').click()
          })
      
          it('a new blog can be created', function() {
            cy.contains('Add Blog').click()
            cy.get('#Title').type('Cypress');
            cy.get('#Author').type('Samundra');
            cy.get('#Url').type('cypress.com');
            cy.get('#Likes').type(20);
            cy.get('#addblog-btn').click()
            cy.contains('Cypress')
          })
        })
    })