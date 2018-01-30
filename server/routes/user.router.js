var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


// Handles Ajax request for user information if user is authenticated
router.get('/', function (req, res) {
  console.log('get /user route');
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      id: req.user.id,
      name: req.user.full_name,
      email: req.user.email
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function (req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

router.get('/therapist', function (req, res) {
  pool.connect(function (errorConnectingToDatabase, client, done) {
    if (errorConnectingToDatabase) {
      console.log('error', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query(`SELECT therapists.full_name, therapists.email, therapists.profile_picture, 
      therapists.biography, therapists.workplace_street_address, therapists.workplace_zipcode, 
      therapists.years_in_practice, therapists.school, therapists.year_graduated, therapists.license_number, 
      array_agg(DISTINCT insurance_plans.insurance_name) AS insurance_plans, array_agg(DISTINCT issues.issue_name) 
      AS issues, array_agg(DISTINCT specialties.specialty_name) AS specialties FROM therapists JOIN therapists_insurance_plans 
      ON therapists.id = therapists_insurance_plans.therapists_id JOIN insurance_plans 
      ON therapists_insurance_plans.insurance_plans_id = insurance_plans.id JOIN therapists_issues 
      ON therapists.id = therapists_issues.therpaists_id JOIN issues ON therapists_issues.issues_id = issues.id 
      LEFT JOIN therapists_specialties ON therapists.id = therapists_specialties.therapists_id LEFT JOIN specialties 
      ON therapists_specialties.specialties_id = specialties.id WHERE therapists.id =$1 
      GROUP BY therapists.full_name, therapists.email, therapists.profile_picture, therapists.biography, 
      therapists.workplace_street_address, therapists.workplace_zipcode, therapists.years_in_practice, 
      therapists.school, therapists.year_graduated, therapists.license_number;`, [req.user.id], function (errorMakingDatabaseQuery, result) {
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
})


module.exports = router;
