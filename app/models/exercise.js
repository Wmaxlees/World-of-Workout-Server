// app/models/exercise.js

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

module.exports = mongoose.model('Exercise', ExerciseSchema);