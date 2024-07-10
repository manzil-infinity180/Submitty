const path = require('path');
describe('download zip button,export team, gradeable json file', () => {
    const downloadsFolder = Cypress.config('downloadsFolder');
    it('downloading and verifying the file', () => {
        cy.login();
        cy.visit(['sample', 'gradeable', 'grading_homework_team_pdf', 'grading', 'details']);
        cy.get('[data-testid="export-team-members"]').click();
        let filename = path.join(downloadsFolder, 'sample_grading_homework_team_pdf_teams.csv');
        cy.readFile(filename, { timeout: 15000 }).should('contain', 'Joe,Student,student,00106_student,,1,3');

        // download gradeable json button
        cy.visit(['sample', 'gradeable', 'grading_homework_team_pdf', 'update?nav_tab=0']);
        cy.get('[data-testid="download-gradeable-btn"]').click();
        filename = path.join(downloadsFolder, 'grading_homework_team_pdf.json');
        cy.readFile(filename, { timeout: 15000 }).then((content) => {
            expect(content).to.deep.equal({
                "title": "Grading Homework Team PDF",
                "type": "Electronic File",
                "id": "grading_homework_team_pdf",
                "instructions_url": "",
                "syllabus_bucket": "homework",
                "autograding_config_path": "\/usr\/local\/submitty\/more_autograding_examples\/pdf_word_count\/config",
                "bulk_upload": false,
                "team_gradeable": {
                    "team_max_size": 3,
                    "inherit_from": ""
                },
                "ta_grading": true,
                "grade_inquiries": true,
                "dates": {
                    "ta_view_start_date": "1970-01-01 23:59:59",
                    "grade_start_date": "1973-01-01 23:59:59",
                    "grade_due_date": "9998-12-31 23:59:59",
                    "grade_released_date": "9998-12-31 23:59:59",
                    "team_lock_date": "1972-01-01 23:59:59",
                    "submission_open_date": "1971-01-01 23:59:59",
                    "submission_due_date": "1972-01-01 23:59:59",
                    "grade_inquiry_start_date": "9999-01-01 23:59:59",
                    "grade_inquiry_due_date": "9999-01-06 23:59:59",
                    "has_due_date": true,
                    "has_release_date": true,
                    "late_submission_allowed": true,
                    "late_days": 0
                }
            });
        });

        // download zip file button
        cy.visit(['sample', 'gradeable', 'grading_homework', 'grading', 'grade?who_id=hG1b13ljpDjKu32&sort=id&direction=ASC']);
        cy.get('body').type('{O}');
        cy.get('[data-testid="download-zip-file"]').click();
        filename = path.join(downloadsFolder, 'grading_homework_hG1b13ljpDjKu32_v1.zip');
        cy.readFile(filename, { timeout: 15000 });
    });
});