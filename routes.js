var express = require('express');
var quotes = require('./lib/quotes.js');

module.exports = function(app) {
  app.route('/')
  .get(function(req, res) {
    res.render('home', {
      quote: quotes.randomQuote()
    });
  })
  .post(function(req, res) {
    console.log('damn');
  });
  app.route('/dragon')
  .get(function(req, res) {
    res.render('dragon', {
      pageTestScript: '/qa/tests-dragon.js'
    });
  });
  app.route('/filth')
  .get(function(req, res) {
    res.render('filth', {

    });
  });
  app.route('/smooth')
  .get(function(req, res) {
    res.render('smooth', {

    });
  });
  app.route('/form')
  .get(function(req, res) {
    res.render('form', {

    });
  });
  app.route('/headers')
  .get(function(req, res) {
    res.set('Content-Type', 'text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
      res.send(s);
  });
};
