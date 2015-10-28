var express = require('express');

var app = express();
var handlebars = require('express-handlebars')
  .create({
    defaultLayout: 'main'
  });
var quotes = require('./lib/quotes.js');


app.engine('handlebars', handlebars.engine);

app.set('port', process.env.PORT || 1997);
app.set('view engine', 'handlebars');

//testing middleware
app.use(function(req, res, next) {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

//routes
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


//static middleware
app.use(express.static(__dirname + '/public'));


//middleware for errors
//404
app.use(function(req, res, next) {
  res.status(404);
  res.render('error');
});

//500
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('error');
});

app.listen(app.get('port'), function() {
  console.log('dolo listening on port ' + app.get('port'));
});
