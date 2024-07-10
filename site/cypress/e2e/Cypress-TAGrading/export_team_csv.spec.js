const path = require('path');
describe('downloading export team csv file', () => {
    const downloadsFolder = Cypress.config('downloadsFolder');
    it('downloading and verifying the file', () => {
        cy.login();
        // cy.intercept({
        //     method: 'GET',
        //     url: 'http://localhost:1511/courses/f24/sample/gradeable/grading_homework_team_pdf/grading/teams/export',
        //   }, (req) => {
        //     console.log(req);
        //   })
        cy.visit(['sample', 'gradeable', 'grading_homework_team_pdf', 'grading', 'details']);
        cy.get('[data-testid="export-team-button"]').click();
        const filename = path.join(downloadsFolder, 'sample_grading_homework_team_pdf_teams.csv');
        cy.readFile(filename, { timeout: 15000 }).should('contain', 'Joe,Student,student,00106_student,,1,3');
    });
});