require('dotenv').config()

var express = require('express');
var nodemailer = require("nodemailer");

var router = express.Router();

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "mntherapistfinder@gmail.com",
        pass: process.env.EMAIL_PASS
    }
});
var rand,mailOptions,host,link;

router.get('/send', function (req, res) {
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link = "http://" + req.get('host') + "/email/verify?id=" + rand;
    mailOptions = {
        to: req.query.to,
        subject: "Please confirm your Email account",
        html: "Hello welcome to MN Therapist Finder,<br> Please Click on the link to verify your email and complete registration.<br><a href=" + link + ">Click here to verify</a>"
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            res.end("error");
        } else {
            res.end("sent");
        }
    });
})


router.get('/verify', function (req, res) {
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        if (req.query.id == rand) {
            res.end("<h1>Your Email " + mailOptions.to + " has been Successfully verified! :)");
        }
        else {
            res.end("<h1>Bad Request</h1>");
        }
    }
    else {
        res.end("<h1>Request is from unknown source");
    }
})

router.post('/appointment', function (req, res) {
    mailOptions = {
        to: req.body.therapist_email,
        subject: "Appointment Request",
        html: "<h3>Message from MN Therapist Finder</h3>" +
        "Hello you have a new appointment request with  " 
        + req.body.name + " for "+ req.body.date +  
        "<br>"+ "They can be reached by email at " + req.body.email + 
        " or by phone number at " + req.body.number
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            res.end("error with sending email");
        } else {
            res.end("sent");
        }
    });
});




module.exports = router;