context('PersonalWolke', () => {
  beforeEach(() => {
    cy.visit('https://personalwolke.at/webdesk3/login')

    cy.get('[name="userid"]').type(Cypress.env('username'))
    cy.get('[name="password"]').type(Cypress.env('password'), {log: false})
    cy.get('.login-buttons .btn').click()
  })

  it(`Approve`, () => {
    cy.visit(`https://personalwolke.at/webdesk3/wf_getMyToDos.act`)
    
    cy.intercept('/webdesk3/wf_getMyToDos*').as('fetchTodoList')

    cy.get('body').then((body) => {
      if (!body.find(`#numberOfRows`).length)
        return

      cy.get(`#numberOfRows`)
          .select('100')

      // I'm not sure why do we need it two times, but it doesn't work otherwise...
      cy.wait('@fetchTodoList', { timeout: 15000 })
      cy.wait('@fetchTodoList', { timeout: 15000 })
      cy.wait(1000)
    });

    const checkboxSelector = `input[name*='doApprove']`;
    // const checkboxSelector = "input[name*='doDelete']";

    cy.get('body').then((body) => {
      if (!body.find(checkboxSelector).length)
        return
      
      cy.get(checkboxSelector).check()
      cy.get('#buttonWflistDoBatchProcessing').click()

      cy.wait(15000)
    })

    cy.get(checkboxSelector).should('not.exist')
  })
})
