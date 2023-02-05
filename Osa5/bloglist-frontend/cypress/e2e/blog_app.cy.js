describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            name: 'Joni Orrensalo',
            username: 'jorrensalo',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)

        const user2 = {
            name: 'Sini Orrensalo',
            username: 'sorrensalo',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user2)

        cy.visit('http://localhost:3000')
    })

    it('Blogs are sorted', function () {
        //login
        cy.get('input[name="Username"]').type('jorrensalo')
        cy.get('input[name="Password"]').type('salainen')
        cy.contains('login').click()

        //create the 3 blogs
        cy.contains('new blog').click()

        cy.get('input[name="Title"]').type('Test Title 1')
        cy.get('input[name="Author"]').type('Test Author 1')
        cy.get('input[name="Url"]').type('Test Url 1')

        cy.contains('create').click()
        cy.wait(3000)
        cy.contains('new blog').click()

        cy.get('input[name="Title"]').type('Test Title 2')
        cy.get('input[name="Author"]').type('Test Author 2')
        cy.get('input[name="Url"]').type('Test Url 2')

        cy.contains('create').click()
        cy.wait(3000)
        cy.contains('new blog').click()

        cy.get('input[name="Title"]').type('Test Title 3')
        cy.get('input[name="Author"]').type('Test Author 3')
        cy.get('input[name="Url"]').type('Test Url 3')

        cy.contains('create').click()

        //like them
        cy.get('.expandButton').eq(2).click()
        cy.get('.likeButton').eq(2).click()
        cy.contains('Likes: 1').should('exist')

        cy.get('.blog').eq(0).should('contain', 'Test Title 3')
        cy.get('.blog').eq(1).should('contain', 'Test Title 1')
        cy.get('.blog').eq(2).should('contain', 'Test Title 2')

        cy.get('.expandButton').eq(2).click()
        cy.get('.likeButton').eq(2).click()
        cy.wait(1000)
        cy.get('.likeButton').eq(0).click()
        cy.wait(1000)
        cy.get('.likeButton').eq(0).click()
        cy.wait(1000)
        cy.contains('Likes: 3').should('exist')

        cy.get('.blog').eq(0).should('contain', 'Test Title 2')
        cy.get('.blog').eq(1).should('contain', 'Test Title 3')
        cy.get('.blog').eq(2).should('contain', 'Test Title 1')
    })

    //it('Login form is shown', function () {
    //    cy.visit('http://localhost:3000')
    //    cy.contains('Login').should('exist')
    //})
    //
    //describe('Login', function () {
    //    it('fails with wrong credentials', function () {
    //        cy.get('input[name="Username"]').type('jorrensalo')
    //        cy.get('input[name="Password"]').type('wrong')
    //        cy.contains('login').click()
    //
    //        cy.contains('wrong credentials').should('exist')
    //    })
    //
    //    it('succeeds with correct credentials', function () {
    //        cy.get('input[name="Username"]').type('jorrensalo')
    //        cy.get('input[name="Password"]').type('salainen')
    //        cy.contains('login').click()
    //
    //        cy.contains('Blogs').should('exist')
    //    })
    //})
    //
    //it('A blog can be created', function () {
    //    cy.get('input[name="Username"]').type('jorrensalo')
    //    cy.get('input[name="Password"]').type('salainen')
    //    cy.contains('login').click()
    //
    //    cy.contains('new blog').click()
    //
    //    cy.get('input[name="Title"]').type('Test Title')
    //    cy.get('input[name="Author"]').type('Test Author')
    //    cy.get('input[name="Url"]').type('Test Url')
    //
    //    cy.contains('create').click()
    //
    //    cy.contains('Created new blog').should('exist')
    //})
    //
    //it('A blog can be liked', function () {
    //    cy.get('input[name="Username"]').type('jorrensalo')
    //    cy.get('input[name="Password"]').type('salainen')
    //    cy.contains('login').click()
    //
    //    cy.contains('new blog').click()
    //
    //    cy.get('input[name="Title"]').type('Test Title')
    //    cy.get('input[name="Author"]').type('Test Author')
    //    cy.get('input[name="Url"]').type('Test Url')
    //
    //    cy.contains('create').click()
    //
    //    cy.contains('expand').click()
    //    cy.contains('Likes: 0').should('exist')
    //
    //    cy.contains('like').click()
    //
    //    cy.contains('Likes: 1').should('exist')
    //})
    //
    //it('A blog can be deleted', function () {
    //    cy.get('input[name="Username"]').type('jorrensalo')
    //    cy.get('input[name="Password"]').type('salainen')
    //    cy.contains('login').click()
    //
    //    cy.contains('new blog').click()
    //
    //    cy.get('input[name="Title"]').type('Test Title')
    //    cy.get('input[name="Author"]').type('Test Author')
    //    cy.get('input[name="Url"]').type('Test Url')
    //
    //    cy.contains('create').click()
    //
    //
    //
    //    cy.contains('expand').click()
    //    cy.contains('Title: Test Title').should('exist')
    //
    //    cy.contains('delete').click()
    //
    //    cy.contains('Title: Test Title').should('not.exist')
    //})
    //
    //it('Only creator sees delete button', function () {
    //    cy.get('input[name="Username"]').type('jorrensalo')
    //    cy.get('input[name="Password"]').type('salainen')
    //    cy.contains('login').click()
    //
    //    cy.contains('new blog').click()
    //
    //    cy.get('input[name="Title"]').type('Test Title')
    //    cy.get('input[name="Author"]').type('Test Author')
    //    cy.get('input[name="Url"]').type('Test Url')
    //
    //    cy.contains('create').click()
    //    cy.contains('expand').click()
    //
    //    cy.contains('delete').should('exist')
    //
    //    cy.contains('logout').click()
    //
    //    cy.get('input[name="Username"]').type('sorrensalo')
    //    cy.get('input[name="Password"]').type('salainen')
    //    cy.contains('login').click()
    //
    //    cy.contains('expand').click()
    //
    //    cy.contains('delete').should('not.exist')
    //})
})