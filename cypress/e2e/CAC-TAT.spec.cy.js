describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  });

  it('verificar o titulo da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Mairy')
    cy.get('#lastName').type('Bueno')
    cy.get('#email').type('mairyeduardo@gmail.com')
    cy.get('#open-text-area').type('Gostaria de pedir ajuda')
    cy.get('.button').click()
    cy.get('.success')
    .should('be.visible')
  });
})