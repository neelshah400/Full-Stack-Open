describe('bloglist app', () => {
  const user1 = {
    name: 'User 1',
    username: 'user1',
    password: 'password1',
  };

  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', user1);
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', () => {
    cy.contains('log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#usernameInput').type(user1.username);
      cy.get('#passwordInput').type(user1.password);
      cy.get('#loginButton').click();
      cy.get('.success')
        .should('contain', 'logged in successfully')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.contains(`${user1.name} logged in`);
    });

    it('fails with wrong credentials', () => {
      cy.get('#usernameInput').type(user1.username);
      cy.get('#passwordInput').type('WrongPassword');
      cy.get('#loginButton').click();
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.get('html').should('not.contain', `${user1.name} logged in`);
    });
  });

  describe('when logged in', () => {
    const blog1 = {
      title: 'Blog 1',
      author: 'Author 1',
      url: 'https://www.blog1.com',
    };

    beforeEach(() => {
      cy.login(user1);
    });

    it('a blog can be created', () => {
      cy.contains('create new blog').click();
      cy.get('#titleInput').type(blog1.title);
      cy.get('#authorInput').type(blog1.author);
      cy.get('#urlInput').type(blog1.url);
      cy.get('#createButton').click();
      cy.get('.success')
        .should('contain', `a new blog ${blog1.title} by ${blog1.author} added`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.get('#blogDiv').contains(`${blog1.title} ${blog1.author}`);
    });

    describe('and several blogs exist', () => {
      const blogs = [];

      beforeEach(() => {
        for (let i = 1; i <= 5; i += 1) {
          const blog = {
            title: `Blog ${i}`,
            author: `Author ${i}`,
            url: `https://www.blog${i}.com`,
          };
          blogs.push(blog);
          cy.createBlog(blog);
        }
      });

      it('a blog can be deleted', () => {
        cy.contains(blogs[0].title).parent().as('blogDiv');
        cy.get('@blogDiv').contains('view').click();
        cy.get('@blogDiv').contains('remove').click();
        cy.get('.success')
          .should('contain', `blog ${blogs[0].title} by ${blogs[0].author} deleted`)
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid');
      });

      it('blogs are ordered according to likes', () => {
        cy.get('html')
          .find('.blog')
          .each((blog, index) => {
            cy.get(blog).contains(blogs[index].title).parent().as('blogDiv');
            cy.get('@blogDiv').contains('view').click();
            cy.wrap(Array(index + 1).fill(0)).each(() => {
              cy.get('@blogDiv').contains('like').as('likeButton');
              cy.get('@likeButton').click();
            });
          });
        cy.get('.success', { timeout: 10000 }).should('not.exist');
        cy.get('html')
          .find('.likes')
          .then((likes) => {
            let likeCounts = likes.text().replaceAll('likes ', '').split('like');
            likeCounts.pop();
            likeCounts = likeCounts.map((cnt) => parseInt(cnt, 10));
            expect(likeCounts).to.deep.eq(likeCounts.slice().sort().reverse());
          });
      });
    });
  });
});
