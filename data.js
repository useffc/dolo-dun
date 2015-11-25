var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var testSchema = mongoose.Schema(
  {
    name: String,
    surname: String,
    style: String,
    color: String
  },
  {
    collection: 'test'
  }
);
var testModel = mongoose.model('testModel', testSchema);

module.exports = testModel;
