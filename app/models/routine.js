// app/models/routine.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
    name: String,
    amount: Number,
    timed: Boolean,
    ordinal: Number,
    primary: Number,
    secondary_one: Number,
    secondary_two: Number
});

var RoutineSchema = new Schema({
   exercises: [ExerciseSchema]
});

module.exports = mongoose.model('Routine', AuthPairSchema);