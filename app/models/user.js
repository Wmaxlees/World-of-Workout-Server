// app/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    name: String,
    level: Number,
    experience: Number,
    title: String,
    achievement_points: Number,
    achievements: [Boolean],
    stats: [Number],
    stat_experience: [Number],
    friends: [Number],
});

module.exports = mongoose.model('User', UserSchema);