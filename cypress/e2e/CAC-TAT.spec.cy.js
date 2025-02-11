/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', () => {
  const textoLongo = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  beforeEach(() => {
    cy.visit('./src/index.html')
  }); 

  it('verificar o titulo da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  }) 

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('teste')
    cy.get('#lastName').type('teste')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type(textoLongo, {delay: 0})
    cy.contains('.button', 'Enviar').click()
    
    cy.get('.success').should('be.visible')
  }); 

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('teste')
    cy.get('#lastName').type('teste')
    cy.get('#email').type('teste@testecom')
    cy.get('#open-text-area').type('teste')
    cy.contains('.button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  });

  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone').type('teste')

    cy.get('input[type="number"]').should('have.value', '')
  }); 

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('teste')
    cy.get('#lastName').type('teste')
    cy.get('#email').type('teste@teste.com')
    cy.get('#check').parent().find('input[id="phone-checkbox"]').click()
    cy.get('#open-text-area').type('teste')
    cy.contains('.button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  }); 

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('teste')
      .should('have.value', 'teste')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('teste')
      .should('have.value', 'teste')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('teste@teste.com')
      .should('have.value', 'teste@teste.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('999999999')
      .should('have.value', '999999999')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type('teste')
      .should('have.value', 'teste')
      .clear()
      .should('have.value', '')
  }); 

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('.button', 'Enviar').click()

    cy.get('.error').should('be.visible')  
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    
    cy.get('.success').should('be.visible')
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
      cy.get('select').select('youtube')
      .should('have.value', 'youtube')
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('select').select('mentoria')
      .should('have.value', 'mentoria')
  });

  it('seleciona um produto (Blog) por seu índice', () => {
      cy.get('select').select([1])
      .should('have.value', 'blog')
  });

  it('marca o tipo de atendimento "Feedback', () => {
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback') 
  });

  it('marca cada tipo de atendimento', () => {
      cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio)=> {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })

  });

})