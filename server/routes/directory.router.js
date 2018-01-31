var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


// query for getting therapist info on main directory page
router.get('/therapistinfo', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT therapists.id,therapists.full_name, therapists.email, therapists.profile_picture, therapists.biography, therapists.workplace_street_address, therapists.workplace_zipcode, therapists.years_in_practice, therapists.school, therapists.year_graduated, therapists.license_number, 
            array_agg(DISTINCT insurance_plans.insurance_name) 
            AS insurance_plans, array_agg(DISTINCT issues.issue_name) AS issues, array_agg(DISTINCT specialties.specialty_name) AS specialties, array_agg(DISTINCT availability.available_from) 
            AS available_times FROM therapists LEFT JOIN therapists_insurance_plans  ON therapists.id = therapists_insurance_plans.therapists_id LEFT JOIN insurance_plans ON therapists_insurance_plans.insurance_plans_id = insurance_plans.id 
            LEFT JOIN therapists_issues ON therapists.id = therapists_issues.therapists_id LEFT JOIN issues ON therapists_issues.issues_id = issues.id 
            LEFT JOIN therapists_specialties ON therapists.id = therapists_specialties.therapists_id LEFT JOIN specialties ON therapists_specialties.specialties_id = specialties.id 
            LEFT JOIN availability ON therapists.id = availability.therapists_id 
            GROUP BY therapists.id, therapists.full_name, therapists.email, therapists.profile_picture, therapists.biography, therapists.workplace_street_address, therapists.workplace_zipcode, therapists.years_in_practice, therapists.school, therapists.year_graduated, therapists.license_number
            ;`, function (errorMakingDatabaseQuery, result) {
                done();
                if (errorMakingDatabaseQuery) {
                    console.log('error', errorMakingDatabaseQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
}); // end query for getting therapist info on main directory page


module.exports = router;
