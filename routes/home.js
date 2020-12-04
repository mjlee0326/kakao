var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
var User = require('../models/User');


// Home
router.get('/', function(req, res) {
    res.render('home/welcome');
});
router.get('/about', function(req, res) {
    res.render('home/about');
});

// Login
router.get('/login', function(req, res) {
    var username = req.flash('username')[0];
    var errors = req.flash('errors')[0] || {};
    res.render('home/login', {
        username: username,
        errors: errors
    });
});

// Post Login
router.post('/login',
    function(req, res, next) {
        var errors = {};
        var isValid = true;

        if (!req.body.username) {
            isValid = false;
            errors.username = 'Username is required!';
        }
        if (!req.body.password) {
            isValid = false;
            errors.password = 'Password is required!';
        }

        if (isValid) {
            next();
        } else {
            req.flash('errors', errors);
            // res.redirect('/login');
        }
    },
    passport.authenticate('local-login', {
        session: true
    }),
    function(req, res) {
        User.findOne({ _id: req.user.id }, function(err, user) {
            if (err) return res.send(err);
            else res.send(user);

        })

    });


// Logout
router.get('/logout', function(req, res) {
    req.logout();
    res.json({ success: "true" });
    // res.redirect('/');
});

module.exports = router;