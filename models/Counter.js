// models/Counter.js

var mongoose = require('mongoose');

// Schema
var counterSchema = mongoose.Schema({
    name: { type: String, require: true },
    count: { type: Number, default: 0 }
});

// Model & Export
var Counter = mongoose.model('counter', counterSchema);
module.exports = Counter;