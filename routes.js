var express = require('express');
var quotes = require('./lib/quotes.js');
var model = require('./data');

module.exports = function(app) {
  app.route('/')
  .get(function(req, res) {
    res.render('home', {
      quote: quotes.randomQuote()
    });
  })
  .post(function(req, res) {
    console.log('damn');
    res.sendStatus(200);
  });
  app.route('/dragon')
  .get(function(req, res) {
    res.render('dragon', {
      pageTestScript: '/qa/tests-dragon.js'
    });
  });
  app.route('/data')
  .get(function(req, res) {
    model.find(function(err, data) {
      console.log(data);
      if(err) {
        res.send(err);
      }
      res.json(data);
    });
  });
  app.route('/headers')
  .get(function(req, res) {
    res.set('Content-Type', 'text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
      res.send(s);
  });
  app.route('/app')
  .get(function(req, res) {
    res.render('', {
    });
  });
};
