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
      array_agg(DISTINCT insurance_plans.id) AS insurance_id,
      array_agg(DISTINCT insurance_plans.insurance_name) AS insurance_plans, array_agg(DISTINCT issues.id) AS issueid, array_agg(DISTINCT issues.issue_name) 
      AS issues, array_agg(DISTINCT specialties.specialty_name) AS specialties FROM therapists LEFT JOIN therapists_insurance_plans 
      ON therapists.id = therapists_insurance_plans.therapists_id LEFT JOIN insurance_plans 
      ON therapists_insurance_plans.insurance_plans_id = insurance_plans.id LEFT JOIN therapists_issues 
      ON therapists.id = therapists_issues.therapists_id LEFT JOIN issues ON therapists_issues.issues_id = issues.id 
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
            console.log('----------------', result.rows[0].issues);
            newArr = []
            newArrHealthcare = [];
            for (var i = 0; i < result.rows[0].issues.length; i++) {
              var obj = { name: result.rows[0].issues[i], id: result.rows[0].issueid[i] }

              newArr.push(obj);
            }
            for (var i = 0; i < result.rows[0].insurance_plans.length;i++){
              var objh = {name: result.rows[0].insurance_plans[i], id: result.rows[0].insurance_id[i]}
              newArrHealthcare.push(objh);
            }
              console.log('---------', newArr)
            result.rows[0].issues = newArr;
            result.rows[0].insurance_plans = newArrHealthcare;
            res.send(result.rows);
          }
        });
    }
  });
});

router.get('/issues', function (req, res) {
  pool.connect(function (errorConnectingToDatabase, client, done) {
    if (errorConnectingToDatabase) {
      console.log('error', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query(`SELECT * FROM issues`, function (errorMakingDatabaseQuery, result) {
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

router.post('/issues', function (req, res) {
  pool.connect(function (errorConnectingToDatabase, client, done) {
    if (errorConnectingToDatabase) {
      console.log('error', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query(`INSERT INTO therapists_issues ("therapists_id","issues_id")
      VALUES ($1,$2)`, [req.user.id, req.body.id], function (errorMakingDatabaseQuery, result) {
          done();
          if (errorMakingDatabaseQuery) {
            console.log('error', errorMakingDatabaseQuery);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
    }
  });
});

router.delete('/issues', function (req, res) {
  pool.connect(function (errorConnectingToDatabase, client, done) {
    if (errorConnectingToDatabase) {
      console.log('error', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query(`DELETE FROM therapists_issues WHERE therapists_id=$1 AND issues_id = $2`, [req.user.id, req.query.issues_id], function (errorMakingDatabaseQuery, result) {
        done();
        if (errorMakingDatabaseQuery) {
          console.log('error', errorMakingDatabaseQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
})

router.get('/healthcare', function (req, res) {
  pool.connect(function (errorConnectingToDatabase, client, done) {
    if (errorConnectingToDatabase) {
      console.log('error', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query(`SELECT * FROM insurance_plans`, function (errorMakingDatabaseQuery, result) {
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
});

router.post('/healthcare', function (req, res) {
  pool.connect(function (errorConnectingToDatabase, client, done) {
    if (errorConnectingToDatabase) {
      console.log('error', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query(`INSERT INTO therapists_insurance_plans ("insurance_plans_id","therapists_id")
      VALUES ($1,$2)`, [req.body.id, req.user.id], function (errorMakingDatabaseQuery, result) {
          done();
          if (errorMakingDatabaseQuery) {
            console.log('error', errorMakingDatabaseQuery);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
    }
  });
});


router.delete('/healthcare', function (req, res) {
  console.log('-------healthcare', req.query.id);
  pool.connect(function (errorConnectingToDatabase, client, done) {
    if (errorConnectingToDatabase) {
      console.log('error', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query(`DELETE FROM therapists_insurance_plans WHERE  therapists_id = $1  AND insurance_plans_id=$2  `, [req.user.id,req.query.id], function (errorMakingDatabaseQuery, result) {
        done();
        if (errorMakingDatabaseQuery) {
          console.log('error', errorMakingDatabaseQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
})

module.exports = router;
