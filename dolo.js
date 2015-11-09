var express = require('express');

var app = express();
var handlebars = require('express-handlebars')
  .create({
    defaultLayout: 'main'
  });
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

app.engine('handlebars', handlebars.engine);

app.set('port', process.env.PORT || 1997);
app.set('view engine', 'handlebars');

//testing middleware
app.use(function(req, res, next) {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

//routes
var routes = require('./routes')(app);

//db stuff
var data = require('./data');

app.disable('x-powered-by');

//static middleware
app.use(express.static(__dirname + '/public'));


//middleware for errors
//500
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('error');
});

//404
app.use(function(req, res) {
  res.status(404);
  res.render('error', {
    status: res.status,
    message: res.locals,
    hello: 'hello'
  });
});

//body parser
app.use(bodyParser.json());


module.exports.app = app;

app.listen(app.get('port'), function() {
  console.log('dolo listening on port ' + app.get('port'));
});
