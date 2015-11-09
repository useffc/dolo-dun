var express = require('express');
var mongoose = require('mongoose');

module.exports = function(app) {
  mongoose.connect('mongodb://localhost/test');
  var testSchema = mongoose.Schema({
    name: String,
    style: String,
    color: String
  });
  var testModel = mongoose.model('testModal', testSchema);
};
