describe('Toggle the two panel mode', () => {
    Cypress.on('uncaught:exception', () => {
        return false;
    });
    it('Visual Testing', () => {
        cy.login();
        cy.visit(['sample', 'gradeable', 'grading_homework', 'grading', 'grade?who_id=hG1b13ljpDjKu32&sort=id&direction=ASC']);
        cy.get('[data-testid="sidebar"]').contains('Collapse Sidebar').click();
        cy.get('#fullscreen-btn-cont').click();
        cy.get('[data-testid="two-panel-mode-btn"]').click();
        cy.get('[data-testid="layout-equal-height"]').click();
        cy.get('[data-testid="panels-container"]').compareSnapshot('panel-mode-2', 0.02, {
            capture: 'viewport',
        });
        cy.get('[data-testid="two-panel-mode-btn"]').click();
        cy.get('[data-testid="layout-tall-left"]').click();
        cy.get('#electronic-gradeable-container').compareSnapshot('panel-mode-3', 0.02, {
            capture: 'viewport',
        });
        cy.get('[data-testid="two-panel-mode-btn"]').click();
        cy.get('[data-testid="layout-equal-two-in-left"]').click();
        cy.get('[data-testid="panels-container"]').compareSnapshot('panel-mode-4', 0.02, {
            capture: 'viewport',
        });
        cy.get('[data-testid="two-panel-mode-btn"]').click();
        cy.get('[data-testid="layout-tall-left-two-in-left"]').click();
        cy.get('#electronic-gradeable-container').compareSnapshot('panel-mode-5', 0.02, {
            capture: 'viewport',
        });
        cy.get('[data-testid="two-panel-mode-btn"]').click();
        cy.get('[data-testid="layout-equal-four-panel"]').click();
        cy.get('[data-testid="panels-container"]').compareSnapshot('panel-mode-6', 0.02, {
            capture: 'viewport',
        });
    });
});
