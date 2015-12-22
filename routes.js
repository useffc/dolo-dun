var express = require('express');
var quotes = require('./lib/quotes.js');
var model = require('./data');

module.exports = function(app) {
  app.route('/')
  .get(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  })
  .post(function(req, res) {
    res.sendStatus(200);
  });
};
