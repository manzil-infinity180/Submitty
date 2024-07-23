describe('Test cases for TA grading page', () => {
    it('Grader should be able to add and remove overall comments', () => {
        cy.login('instructor');
        cy.visit(['sample', 'gradeable', 'grading_homework', 'grading', 'grade?who_id=jKjodWaRdEV9pBb&sort=id&direction=ASC']);
        cy.get('body').type('{A}');
        cy.get('body').type('{G}');
        cy.get('[data-testid="grading-rubric"]').should('contain', 'Grading Rubric');
        cy.get('[data-testid="component-container"]').its('length').should('eq', 4);
        cy.get('[data-testid="component-container"]').eq(0).should('contain', 'Read Me');
        cy.get('[data-testid="component-container"]').eq(1).should('contain', 'Coding Style');
        cy.get('[data-testid="component-container"]').eq(2).should('contain', 'Documentation');
        cy.get('[data-testid="component-container"]').eq(3).should('contain', 'Extra Credit');
        cy.get('[data-testid="component-container"]').eq(0).click();
        cy.get('[data-testid="component-container"]').eq(0)
            .should('contain', 'Full Credit')
            .should('contain', 'Minor errors in Read Me')
            .should('contain', 'Major errors in Read Me or Read Me missing');
        cy.get('body').type('{0}');
        cy.get('[data-testid="save-tools-save"]').should('contain', 'Save');
        cy.get('[data-testid="save-tools-save"]').click();
        cy.get('[data-testid="component-container"]').eq(1).should('contain', 'Coding Style');
        cy.get('[data-testid="component-container"]').eq(1).click();
        cy.get('[data-testid="component-container"]').eq(1)
            .should('contain', 'Full Credit')
            .should('contain', 'Code is unreadable')
            .should('contain', 'Code is very difficult to understand')
            .should('contain', 'Code is difficult to understand');
        cy.get('body').type('{3}');
        cy.get('[data-testid="save-tools-save"]').click();
        cy.get('[data-testid="component-container"]').eq(2).should('contain', 'Documentation');
        cy.get('[data-testid="component-container"]').eq(2).click();
        cy.get('[data-testid="component-container"]').eq(2)
            .should('contain', 'Full Credit')
            .should('contain', 'No documentation')
            .should('contain', 'Very little documentation or documentation makes no sense')
            .should('contain', 'Way too much documentation and/or documentation makes no sense');
        cy.get('body').type('{2}');
        cy.get('[data-testid="save-tools-save"]').click();
        cy.get('[data-testid="component-container"]').eq(3).should('contain', 'Extra Credit');
        cy.get('[data-testid="component-container"]').eq(3).click();
        cy.get('[data-testid="component-container"]').eq(3)
            .should('contain', 'Full Credit')
            .should('contain', 'Extra credit done poorly')
            .should('contain', 'Extra credit is acceptable');
        cy.get('body').type('{0}');
        cy.get('[data-testid="save-tools-save"]').click();
        cy.get('#grading_total').eq(1).should('contain', '2 / 2');
        cy.get('#grading_total').eq(2).should('contain', '2 / 5');
        cy.get('#grading_total').eq(3).should('contain', '2 / 5');
        cy.get('#grading_total').eq(4).should('contain', '0 / 0');
        cy.get('#grading_total').eq(5).should('contain', '6 / 12').should('contain', 'Total');
    });
});
