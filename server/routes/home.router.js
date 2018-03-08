var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


router.get('/issues', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('errorConnectingToDatabase', errorConnectingToDatabase)
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM issues ORDER BY issue_name;`, function (errorMakingDatabaseQuery, result) {
                done();
                if (errorMakingDatabaseQuery) {
                    console.log('errorMakingDatabaseQuery', errorMakingDatabaseQuery)
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

router.get('/insurance', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('errorConnectingToDatabase', errorConnectingToDatabase)
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM insurance_plans ORDER BY insurance_name;`, function (errorMakingDatabaseQuery, result) {
                done();
                if (errorMakingDatabaseQuery) {
                    console.log('errorMakingDatabaseQuery', errorMakingDatabaseQuery)
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

router.get('/search', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('errorConnectingToDatabase', errorConnectingToDatabase)
            res.sendStatus(500);
        } else {
            //currently selects all therapists who match given user inputs within a 5 mile radius of a user defined location
            client.query(`	SELECT * FROM ( SELECT therapists.id,therapists.full_name, therapists.email, therapists.profile_picture, therapists.biography, 
                therapists.workplace_street_address, therapists.workplace_zipcode, therapists.workplace ,therapists.years_in_practice, therapists.school, 
                therapists.year_graduated, therapists.license_number, therapists.license_type, therapists.website, array_agg(DISTINCT insurance_plans.insurance_name) 
                AS insurance_plans, (SELECT $1 = ANY (array_agg(DISTINCT insurance_plans.insurance_name) ::varchar[])) AS query_in_insurance
                , array_agg(DISTINCT issues.issue_name) AS issues, (SELECT $2 = ANY ( (array_agg(DISTINCT issues.issue_name)) ::varchar[])) AS query_in_issues,
                 array_agg(DISTINCT specialties.specialty_name) AS specialties, array_agg(DISTINCT availability.available_from) 
                AS available_times FROM therapists LEFT JOIN therapists_insurance_plans  ON therapists.id = therapists_insurance_plans.therapists_id 
                LEFT JOIN insurance_plans ON therapists_insurance_plans.insurance_plans_id = insurance_plans.id 
                LEFT JOIN therapists_issues ON therapists.id = therapists_issues.therapists_id LEFT JOIN issues ON therapists_issues.issues_id = issues.id 
                LEFT JOIN therapists_specialties ON therapists.id = therapists_specialties.therapists_id LEFT JOIN specialties ON therapists_specialties.specialties_id = specialties.id 
                LEFT JOIN availability ON therapists.id = availability.therapists_id 
                GROUP BY therapists.id, therapists.full_name, therapists.email, therapists.profile_picture, therapists.biography,
                therapists.workplace_street_address, therapists.workplace_zipcode, therapists.years_in_practice, therapists.school, therapists.year_graduated, therapists.license_number) s 
                WHERE s.query_in_insurance = true and s.query_in_issues = true and ST_DWithin(s.workplace, ST_SetSRID(ST_MakePoint($3,  $4), 4326), 5 * 1609);`,[req.query.healthcare, req.query.issue, req.query.lng, req.query.lat] ,function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('errorMakingDatabaseQuery', errorMakingDatabaseQuery)
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                });
        }
    });
});




module.exports = router;

