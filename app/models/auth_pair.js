// app/models/auth_pair.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthPairSchema = new Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('AuthPair', AuthPairSchema);