var quotes = require('./lib/quotes.js');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('home', {
      quote: quotes.randomQuote()
    });
  });
  app.get('/dragon', function(req, res) {
    res.render('dragon', {
      pageTestScript: '/qa/tests-dragon.js'
    });
  });
  app.get('/filth', function(req, res) {
    res.render('filth', {

    });
  });
  app.get('/smooth', function(req, res) {
    res.render('smooth', {

    });
  });
  app.get('/form', function(req, res) {
    res.render('form', {

    });
  });
  app.get('/headers', function(req, res) {
    res.set('Content-Type', 'text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
      res.send(s);
  });
};
