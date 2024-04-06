describe('Test cases revolving around grade inquires', () => {
    beforeEach(() => {
        cy.visit(['sample']);
        cy.login();
    });
    const setGradeInquiriesForGradeable = (gradeableId, date = null, allowed = true) => {
        cy.get(`#${gradeableId} .fa-pencil-alt`).click();

        if (allowed) {
            cy.get('[data-testid="yes-grade-inquiry-allowed"]').click();
        }
        else {
            cy.get('[data-testid="no_grade_inquiry_allowed"]').click();
        }

        if (date) {
            cy.contains('Dates').click();
            cy.get('[data-testid="date_grade_inquiry_due"]').click();

            cy.get('[data-testid="date_grade_inquiry_due"]').should('be.visible');

            cy.get('[data-testid="date_grade_inquiry_due"]').clear().type(date, { parseSpecialCharSequences: false, force: true });
        }

        cy.get('#nav-sidebar-submitty').click();
    };

    it('should test normal submission grade inquiry panel', () => {
        const gradeableId = 'grades_released_homework';
        const gradeInquiryDeadlineDate = '9998-01-01 00:00:00';
        setGradeInquiriesForGradeable(gradeableId, gradeInquiryDeadlineDate, true);

        cy.get(`#${gradeableId} .btn-nav-grade`).click();
        cy.get('[data-testid="view-sections"]').click();
        cy.get('[data-testid="grade-button"]').first().click();
        cy.get('#grade_inquiry_info_btn').click();
        cy.get('[data-testid="grading_label"]').should('contain', 'Grade Inquiry');
        cy.get('[data-testid="grade_inquiry_submit_button"]').should('contain', 'Submit Grade Inquiry').and('be.disabled');
        cy.get('[data-testid="component-tab"]').first().click();
        // cy.get('[data-testid="markdown_area_value"]').select('#reply-text-area-36').click().type('Submitty');
        cy.get('#reply-text-area-36').click().type('Submitty');
        // cy.wait(4000);
        cy.get('[data-testid="markdown-mode-tab-preview"]').first().should('exist');
        // cy.get('[data-testid="markdown-mode-tab-preview"]').first().click();
        cy.get('[data-testid="grade_inquiry_submit_button"]').should('contain', 'Submit Grade Inquiry').and('not.be.disabled');
        // cy.get('[data-testid= "submit"]').should('have.length', 1).and('contain', 'Submit Grade Inquiry');

    });
});
