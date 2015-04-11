// server.js

// Call the packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var oauthserver = require('node-oauth2-server');

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup oauth
/*
app.oauth = oauthserver({
    model: {},
    grants: ['password', 'refresh_token'],
    debug: true
});
*/

// MongoDB connection stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/world_of_exercise');
var User = require('./app/models/user');
var AuthPair = require('./app/models/auth_pair');

// Set the port
var port = process.env.PORT || 55421;

// Express router
var router = express.Router();

// Middleware
router.use(function (req, res, next) {
    // Log the request
    console.log('Recieved request');

    // Pass it on
    next();
});

// OAuth middleware
// app.all('/oauth/token', app.oauth.grant());


// USER ROUTES
// ------------------------------------------
router.route('/users')

    .post(/*app.oauth.authorise(),*/ function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.name = req.body.name;
        user.level = 1;
        user.experience = 0;
        user.title = "";
        user.achievement_points = 0;
        user.achievements = [];
        stats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        stat_experience = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        friends = [];



        user.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created' });
        });
    })

    .get(/*app.oauth.authorise(),*/ function (req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

// ------------------------------------------

// SPECIFIC USER ROUTES
// ------------------------------------------
router.route('/users/:user_id')

    .get(/*app.oauth.authorise(),*/ function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    })

    .put(/*app.oauth.authorise(),*/ function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err)
                res.send(err);

            user.password = req.body.password;
            user.name = req.body.name;
            user.level = req.body.level;
            user.experience = req.body.experience;
            user.title = req.body.title;
            user.achievement_points = req.body.achievement_points;

            user.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated' });
            })
        })
    })

    .delete(/*app.oauth.authorise(),*/ function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
// ------------------------------------------

// ROUTINE ROUTES
// ------------------------------------------
router.route('/routines')

    .post(/*app.oauth.authorise(),*/ function (req, res) {
        var routine = new Routine();
        
    })
// ------------------------------------------

// Register the routes
app.use('/api', router);
app.use(app.oauth.errorHandler());

// Start the server
app.listen(port);
console.log('Listening on port ' + port);