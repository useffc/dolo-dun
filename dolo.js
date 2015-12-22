var express = require('express');

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.set('port', process.env.PORT || 1997);

var routes = require('./routes')(app);

app.disable('x-powered-by');

//static middleware
app.use(express.static(__dirname + '/public'));


//middleware for errors
//500
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('error', {
    status: res.statusCode
  });
});

//404
app.use(function(req, res) {
  res.status(404);
  res.render('error', {
    status: res.statusCode,
    hello: 'hello'
  });
});

module.exports.app = app;

app.listen(app.get('port'), function() {
  console.log('dolo listening on port ' + app.get('port'));
});
