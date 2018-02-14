var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            res.sendStatus(500);
        } else {
            client.query(`SELECT availability.id AS available_time_id, availability.available_from 
            AS available_times FROM availability JOIN therapists 
            ON therapists.id = availability.therapists_id where therapists.id = $1;`,[req.user.id], function (errorMakingDatabaseQuery, result) {
                done();
                if (errorMakingDatabaseQuery) {
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});


router.post('/', function (req, res) {

    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO availability ("therapists_id", "available_from")
            VALUES ($1, $2);`,[req.user.id, req.body.available_from], function (errorMakingDatabaseQuery, result) {
                done();
                if (errorMakingDatabaseQuery) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.delete('/:id', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            res.sendStatus(500);
        } else {
           
            client.query(`DELETE FROM availability WHERE id = $1 `, [req.params.id], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});


module.exports = router;