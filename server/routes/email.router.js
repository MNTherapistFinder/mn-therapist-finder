var express = require('express');
var nodemailer = require("nodemailer");

var router = express.Router();

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "gagliano.joe1@gmail.com",
        pass: process.env.EMAIL_PASS
    }
});
var rand,mailOptions,host,link;

router.get('/send', function (req, res) {
    console.log('--------, ', req.query);
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link = "http://" + req.get('host') + "/email/verify?id=" + rand;
    mailOptions = {
        to: req.query.to,
        subject: "Please confirm your Email account",
        html: "Hello welcome to MN Therapist Finder,<br> Please Click on the link to verify your email and complete registration.<br><a href=" + link + ">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});

router.get('/verify', function (req, res) {
    console.log('host', host);
    console.log('req.protocol', req.protocol);
    console.log(req.protocol + ":/" + req.get('host'));
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email");
        if (req.query.id == rand) {
            console.log("email is verified");
            res.end("<h1>Your Email " + mailOptions.to + " has been Successfully verified! :)");
        }
        else {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else {
        res.end("<h1>Request is from unknown source");
    }
});



module.exports = router;