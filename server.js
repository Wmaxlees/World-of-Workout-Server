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
var Routine = require('./app/models/routine');
var Exercise = require('./app/models/exercise');
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
        user._id = req.body._id;
        user.password = req.body.password;
        user.name = req.body.name;
        user.level = 1;
        user.experience = 0;
        user.title = "";
        user.achievement_points = 0;
        user.achievements = [];

        user.abdominal = 0;
        user.bicep = 0;
        user.deltoids = 0;
        user.erector_spinae = 0;
        user.gastro_soleus = 0;
        user.gluteus = 0;
        user.hamstrings = 0;
        user.lat_dor_rhom = 0;
        user.obliques = 0;
        user.pectoralis = 0;
        user.quadriceps = 0;
        user.trapezius = 0;
        user.triceps = 0;

        user.exp_abdominal = 0;
        user.exp_bicep = 0;
        user.exp_deltoids = 0;
        user.exp_erector_spinae = 0;
        user.exp_gastro_soleus = 0;
        user.exp_gluteus = 0;
        user.exp_hamstrings = 0;
        user.exp_lat_dor_rhom = 0;
        user.exp_obliques = 0;
        user.exp_pectoralis = 0;
        user.exp_quadriceps = 0;
        user.exp_trapezius = 0;
        user.exp_triceps = 0;

        user.friends = [];



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

            user.abdominal = req.body.abdominal;
            user.bicep = req.body.bicep;
            user.deltoids = req.body.deltoids;
            user.erector_spinae = req.body.erector_spinae;
            user.gastro_soleus = req.body.gastro_soleus;
            user.gluteus = req.body.gluteus;
            user.hamstrings = req.body.hamstrings;
            user.lat_dor_rhom = req.body.lat_dor_rhom;
            user.obliques = req.body.obliques;
            user.pectoralis = req.body.pectoralis;
            user.quadriceps = req.body.quadriceps;
            user.trapezius = req.body.trapezius;
            user.triceps = req.body.triceps;

            user.exp_abdominal = req.body.exp_abdominal;
            user.exp_bicep = req.body.exp_bicep;
            user.exp_deltoids = req.body.exp_deltoids;
            user.exp_erector_spinae = req.body.exp_erector_spinae;
            user.exp_gastro_soleus = req.body.exp_gastro_soleus;
            user.exp_gluteus = req.body.exp_gluteus;
            user.exp_hamstrings = req.body.exp_hamstrings;
            user.exp_lat_dor_rhom = req.body.exp_lat_dor_rhom;
            user.exp_obliques = req.body.exp_obliques;
            user.exp_pectoralis = req.body.exp_pectoralis;
            user.exp_quadriceps = req.body.exp_quadriceps;
            user.exp_trapezius = req.body.exp_trapezius;
            user.exp_triceps = req.body.exp_triceps;

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
        routine.exercises = new Array();

        routine._id = req.body.name;

        var arr = req.body.exercises;
        console.log(req.body.exercises);
        for (i = 0; i < arr.length; ++i) {
            var temp = new Exercise();
            temp.name = arr[i].name;
            temp.amount = arr[i].amount;
            temp.timed = arr[i].timed;
            temp.ordinal = arr[i].ordinal;
            temp.primary = arr[i].primary;
            temp.secondary_one = arr[i].secondary_one;
            temp.secondary_two = arr[i].secondary_two;

            console.log(temp);
            routine.exercises.push(temp);
        }

        routine.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Routine created' });
        });
    })

    .get(/*app.oauth.authorise(),*/ function (req, res) {
        Routine.find(function (err, routines) {
            if (err)
                res.send(err);

            res.json(routines);
        });
    });
// ------------------------------------------


router.route('/routines/:routine_id')

    .get(/*app.oauth.authorise(),*/ function (req, res) {
        Routine.findById(req.params.routine_id, function (err, routine) {
            if (err)
                res.send(err);

            res.json(routine);
        });
    })

    .put(/*app.oauth.authorise(),*/ function (req, res) {
        Routine.findById(req.params.routine_id, function (err, routine) {
            if (err)
                res.send(err);

            routine.exercises = new Array();

            var arr = req.body.exercises;
            console.log(req.body.exercises);
            for (i = 0; i < arr.length; ++i) {
                var temp = new Exercise();
                temp.name = arr[i].name;
                temp.amount = arr[i].amount;
                temp.timed = arr[i].timed;
                temp.ordinal = arr[i].ordinal;
                temp.primary = arr[i].primary;
                temp.secondary_one = arr[i].secondary_one;
                temp.secondary_two = arr[i].secondary_two;

                console.log(temp);
                routine.exercises.push(temp);
            }

            console.log(routine.exercises);

            routine.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Routine updated' });
            });

        })
    })

    .delete(/*app.oauth.authorise(),*/ function (req, res) {
        Routine.remove({
            _id: req.params.routine_id
        }, function (err, routine) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// Register the routes
app.use('/api', router);
// app.use(app.oauth.errorHandler());

// Start the server
app.listen(port);
console.log('Listening on port ' + port);