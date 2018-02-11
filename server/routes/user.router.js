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
      therapists.years_in_practice, therapists.school, therapists.year_graduated, therapists.license_number, therapists.license_type, therapists.website,therapists.is_active, therapists.lng, therapists.lat, therapists.phone,
      array_agg(DISTINCT insurance_plans.id) AS insurance_id, array_agg(DISTINCT issues.id) AS issueid, 
      array_agg(DISTINCT specialties.id) AS specialty_id FROM therapists LEFT JOIN therapists_insurance_plans 
      ON therapists.id = therapists_insurance_plans.therapists_id LEFT JOIN insurance_plans 
      ON therapists_insurance_plans.insurance_plans_id = insurance_plans.id LEFT JOIN therapists_issues 
      ON therapists.id = therapists_issues.therapists_id LEFT JOIN issues ON therapists_issues.issues_id = issues.id 
      LEFT JOIN therapists_specialties ON therapists.id = therapists_specialties.therapists_id LEFT JOIN specialties 
      ON therapists_specialties.specialties_id = specialties.id WHERE therapists.id =$1 GROUP BY
      therapists.full_name, therapists.email, therapists.profile_picture, 
      therapists.biography, therapists.workplace_street_address, therapists.workplace_zipcode, 
      therapists.years_in_practice, therapists.school, therapists.year_graduated, therapists.license_number, 
      therapists.license_type, therapists.website, therapists.is_active,therapists.lng, therapists.lat, therapists.phone;`, [req.user.id], function (errorMakingDatabaseQuery, result) {
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

router.put('/therapist', function (req, res) {

  var issues =  '{' + req.query.issueid.toString() + '}';
  var specialties = '{' + req.query.specialty_id.toString() + '}';
  var insurance = '{' + req.query.insurance_id.toString() + '}';

  pool.connect(function (errorConnectingToDatabase, client, done) {
    if (errorConnectingToDatabase) {
      console.log('error', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      var promise1 = client.query(`UPDATE therapists SET full_name = $1, email = $2, biography = $3, 
      workplace_street_address = $4, workplace_zipcode = $5, years_in_practice = $6, school = $7,
       year_graduated=$8, license_number = $9, license_type=$10, website=$11, lng=$12, lat=$13, workplace= (CAST(ST_SetSRID(ST_Point($12, $13),4326) As geography)), profile_picture= $14, phone=$15, is_active=$16 WHERE id = $17`,
        [req.query.full_name, req.query.email, req.query.biography, req.query.workplace_street_address,
        req.query.workplace_zipcode, req.query.years_in_practice, req.query.school, req.query.year_graduated,
        req.query.licesne_number, req.query.license_type, req.query.website, req.query.lng, req.query.lat, req.query.profile_picture, req.query.phone, req.query.is_active, req.user.id]);

      var promise1 = client.query(`DELETE FROM therapists_issues WHERE therapists_id =$1`, [req.user.id]);

      var promise2 = client.query(`DELETE FROM therapists_specialties WHERE therapists_id =$1`, [req.user.id]);

      var promise3 = client.query(`DELETE FROM therapists_insurance_plans WHERE therapists_id =$1`, [req.user.id]);

      var promise4 = client.query(`INSERT INTO therapists_issues("therapists_id", "issues_id") SELECT $1, unnest($2::int[])`, [req.user.id, issues]);

      var promise5 = client.query(`INSERT INTO therapists_specialties("therapists_id", "specialties_id") SELECT $1, unnest($2::int[])`, [req.user.id, specialties]);

      var promise6 = client.query(`INSERT INTO therapists_insurance_plans("therapists_id", "insurance_plans_id") SELECT $1, unnest($2::int[])`, [req.user.id, insurance]);

    }
    Promise.all([promise1, promise2, promise3, promise4, promise5, promise6]).then(function (allPromises) {
      done();
      console.log('result of promises', allPromises)
      res.sendStatus(201);
    }).catch(function (err) {
      console.log('Promise.all did not work!', err);
      res.sendStatus(500);

    });
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
      VALUES ($1,$2)`, [req.user.id, req.query.id], function (errorMakingDatabaseQuery, result) {
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
      client.query(`DELETE FROM therapists_insurance_plans WHERE  therapists_id = $1  AND insurance_plans_id=$2  `, [req.user.id, req.query.id], function (errorMakingDatabaseQuery, result) {
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


router.get('/specialty', function (req, res) {
  pool.connect(function (errorConnectingToDatabase, client, done) {
    if (errorConnectingToDatabase) {
      console.log('error', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query(`SELECT * FROM specialties`, function (errorMakingDatabaseQuery, result) {
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

router.post('/specialty', function (req, res) {
  console.log('HEYHEY HEY HEYHEY', req.body);
  pool.connect(function (errorConnectingToDatabase, client, done) {
    if (errorConnectingToDatabase) {
      console.log('error', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query(`INSERT INTO therapists_specialties ("specialties_id","therapists_id")
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
router.delete('/specialty', function (req, res) {
  pool.connect(function (errorConnectingToDatabase, client, done) {
    if (errorConnectingToDatabase) {
      console.log('error', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query(`DELETE FROM therapists_specialties WHERE  therapists_id = $1  AND specialties_id=$2  `, [req.user.id, req.query.id], function (errorMakingDatabaseQuery, result) {
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





module.exports = router;





// Promise.all([regimentPromise0, regimentPromise1, regimentPromise2, regimentPromise3, regimentPromise4,
//   regimentPromise5]).then(function (resultOfAllPromises) {
//     done();
//     console.log('result', resultOfAllPromises);

//     res.send(resultOfAllPromises);
//   }).catch(function (err) {
//     console.log('Promise.all did not work!', err);
//     res.sendStatus(500);
//   })