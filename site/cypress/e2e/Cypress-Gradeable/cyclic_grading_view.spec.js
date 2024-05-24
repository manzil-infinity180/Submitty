describe('Cyclic grading View Test', () => {
    ['ta', 'instructor'].forEach((user) => {
        it(`${user} cyclic grading view testing for Grading Homework`, () => {
            cy.login(user);
            cy.visit(['sample', 'gradeable', 'grading_homework', 'grading', 'status']);
            cy.get('[data-testid="Grading Index"]').click();
            if (user === 'ta') {
                cy.get('[data-testid="popup-window"]').should('exist');
                cy.get('[data-testid="close-button"]').should('exist');
                cy.get('[data-testid="close_hidden_button"]').should('exist');
                cy.get('[data-testid="agree_popup_btn"]').click();
            }
            cy.get('[data-testid="view-sections"]').click();
            cy.get('[data-testid="grade-button"]').eq(12).click();
            cy.get('[data-testid="student_info_btn"]').click();
            cy.get('[data-testid="rubric_title"]').should('contain', 'Joe Student');
            cy.get('[data-testid="prev_student_navlink"]').click();
            cy.get('[data-testid="rubric_title"]').should('contain', 'John Smith');
            cy.get('[data-testid="grading_setting_btn"]').click(); // change
            cy.get('[data-testid="ta_grading_setting_option"]').first().select('Prev/Next Ungraded Student');
            cy.get('[data-testid="close-button"]').eq(3).click();
            cy.get('[data-testid="next_student_navlink"]').click();
            cy.get('[data-testid="rubric_title"]').should('contain', 'Joe Student');
        });
    });
    ['ta', 'instructor'].forEach((user) => {
        it(`${user} cyclic grading view testing for Grading Team Homework`, () => {
            cy.login(user);
            cy.visit(['sample', 'gradeable', 'grading_team_homework', 'grading', 'status']);
            cy.get('[data-testid="Grading Index"]').click();
            if (user === 'ta') {
                cy.get('[data-testid="popup-window"]').should('exist');
                cy.get('[data-testid="close-button"]').should('exist');
                cy.get('[data-testid="close_hidden_button"]').should('exist');
                cy.get('[data-testid="agree_popup_btn"]').click();
            }
            cy.get('[data-testid="view-sections"]').click();
            cy.get('[data-testid="grade-button"]').eq(1).click();
            cy.get('[data-testid="student_info_btn"]').click();
            cy.get('[data-testid="grading_setting_btn"]').should('exist');
            cy.get('[data-testid="grading_setting_btn"]').children().should('exist');
            cy.get('[data-testid="grading_scroll_message"]').should('exist');
            cy.get('[data-testid="tab_bar_wrapper"').children().its('length').should('be.eq', 3);
            cy.get('#page_1_nav').should('contain', 'Ben Bitdiddle');
            cy.get('#page_2_nav').should('contain', 'Dannie Farrell');
            cy.get('#page_3_nav').should('contain',  'Adan Fisher');
            cy.get('[data-testid="grading_panel_student_name"]').should('contain', 'Ben Bitdiddle').and('contain', 'Dannie Farrell').and('contain', 'Adan Fisher');
            cy.get('[data-testid="next_student_navlink"]').click();
            cy.get('[data-testid="tab_bar_wrapper"').children().its('length').should('be.eq', 3);
            cy.get('[data-testid="grading_panel_student_name"]').should('contain', 'Eunice Hamill ').and('contain', 'Edison King').and('contain', 'Justice Kuhic');
        });
    });
});
