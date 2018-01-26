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
            client.query(`SELECT * FROM therapists
            FULL OUTER JOIN therapists_qualifications ON therapists_qualifications.therapists_id = therapists.id
            FULL OUTER JOIN qualifications ON qualifications.id = therapists_qualifications.qualifications_id;`, function (errorMakingDatabaseQuery, result) {
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
