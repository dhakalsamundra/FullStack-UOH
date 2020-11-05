describe("Blog app", function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3000/api/test/reset');
        cy.Register({ username: 'AdminTest', password: 'AdminTest', name: 'AdminTest' });
        cy.Register({ username: 'root', password: 'root', name: 'root' });
        cy.visit('http://localhost:3000');
      });

  it("front page can be opened", () => {
    cy.contains("blogs");
  });
  it("valid user can be logged in", function () {
    cy.get("#togglable-btn").click();
    cy.get("#username").type("root");
    cy.get("#password").type("root");
    cy.get("#login-button").click();

    cy.contains("root logged in");

  });
  
  it("login fails with invalid credentials", function () {
    cy.get("#togglable-btn").click();
    cy.get("#username").type("abcdefg");
    cy.get("#password").type("ijklmnop");
    cy.get("#login-button").click();

    cy.get(".error")
      .and("contain", "Invalid credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");
    cy.get("html").should("not.contain", "Cypress logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.Login({ username: "AdminTest", password: "AdminTest" });
    });
    it("a new blog can be created", function () {
      cy.contains("Add Blog").click();
      cy.get("#Title").type("Cypress");
      cy.get("#Author").type("Samundra");
      cy.get("#Url").type("abc.com");
      cy.get("#Likes").type(20);
      cy.get("#addblog-btn").click();
      cy.contains("Cypress");
    });

    describe('and blog exists', function(){
        beforeEach(function (){
            cy.AddBlog({
                title: 'cypress2',
                author: 'Samundra2',
                url: 'cypress2.net',
                likes: 2,
            })
            cy.AddBlog({
                title: 'cypress3',
                author: 'Samundra3',
                url: 'cypress3.net',
                likes: 2,
            })
        })
            it('it can be liked', function(){
                cy.contains('Show').click()
                cy.get('.blogStyle').as('blogInfo');
                cy.get('@blogInfo').contains('Like').click();
                cy.get('@blogInfo').contains('3');

            })
              it("a user who created a blog can delete it", function () {
                cy.contains("cypress3")
                  .parent().find('button').click()
                cy.contains('Delete').contains('Delete').click();
                cy.get("html").should("not.contain", "cypress3");
              });
           
        })
    })

  describe("when logged in", function (){
    beforeEach(function () {
        cy.Login({ username: "root", password: "root" });
      });
    
      it("a new blog can be created", function () {
        cy.contains("Add Blog").click();
        cy.get("#Title").type("testing");
        cy.get("#Author").type("root");
        cy.get("#Url").type("root.com");
        cy.get("#Likes").type(20);
        cy.get("#addblog-btn").click();
        cy.contains("testing");
      });
  })
})
