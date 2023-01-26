const timeCorrections = require('./../fixtures/timecorrection')
context('PersonalWolke', () => {
  const currentYear = new Date().getFullYear()

  beforeEach(() => {
    cy.visit('https://personalwolke.at/webdesk3/login')

    cy.get('[name="userid"]').type(Cypress.env('username'))
    cy.get('[name="password"]').type(Cypress.env('password'), {log: false})
    cy.get('.login-buttons .btn').click()
  })

  timeCorrections.forEach(({ day, month, time, description, absent = 'home office', year = currentYear }) => {
    it(`TimeCorrection: ${year}-${month}-${day}: ${description}`, () => {
      cy.visit(`https://personalwolke.at/webdesk3/Zeitkorrektur$EM.proc?from_date=${day}.${month}.${year}`)
      cy.intercept('/webdesk3/Zeitkorrektur$E*').as('changeAbsentType')

      cy.get('#addTimeCorrection').click()
      cy.wait('@changeAbsentType')

      time.forEach(([from, to], index) => {
        cy.get(`#timeCorrections\\.${index}\\.absence_code\\:input`)
        .select(absent)

      cy.wait('@changeAbsentType')

      cy.get(`#timeCorrections\\.0\\.from_time\\:visibleInput`)
        .type(from)
      cy.get(`#timeCorrections\\.${index}\\.to_time\\:visibleInput`)
        .type(to)
        if(index !== time.length - 1) {
          cy.get('#addTimeCorrection').click()
        }
      })

      cy.get('#description textarea')
      .type(description)
      cy.get('#wf_startRequest_button')
        .click()
      cy.url({ timeout: 15000 })
        .should('include','https://personalwolke.at/webdesk3/wf_getMyOpenRequests.act')

    })
  })
})
