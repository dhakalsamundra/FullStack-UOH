describe('Blog app', function(){
    beforeEach(function() {
        cy.visit('http://localhost:3000')
      })

    it('front page can be opened', () => {
        cy.contains('blogs')
    })
    it('login form can be opened', function(){
        cy.contains('Login').click()
    }) 
})