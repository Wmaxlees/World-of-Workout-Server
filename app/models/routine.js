// app/models/routine.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoutineSchema = new Schema({
   exercises: []
});

module.exports = mongoose.model('Routine', RoutineSchema);