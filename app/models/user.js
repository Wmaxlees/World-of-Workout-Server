// app/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: String,
    name: String,
    level: Number,
    experience: Number,
    title: String,
    achievement_points: Number,
    achievements: [Boolean],
    abdominal: Number,
    bicep: Number,
    deltoids: Number,
    erector_spinae: Number,
    gastro_soleus: Number,
    gluteus: Number,
    hamstrings: Number,
    lat_dor_rhom: Number,
    obliques: Number,
    pectoralis: Number,
    quadriceps: Number,
    trapezius: Number,
    triceps: Number,
    exp_abdominal: Number,
    exp_bicep: Number,
    exp_deltoids: Number,
    exp_erector_spinae: Number,
    exp_gastro_soleus: Number,
    exp_gluteus: Number,
    exp_hamstrings: Number,
    exp_lat_dor_rhom: Number,
    exp_obliques: Number,
    exp_pectoralis: Number,
    exp_quadriceps: Number,
    exp_trapezius: Number,
    exp_triceps: Number,
    friends: [Number],
});

module.exports = mongoose.model('User', UserSchema);