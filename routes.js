app = module.parent.exports.app;


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
app.get('/filth', function(req, res) {
  res.render('filth', {

  });
})
app.get('/smooth', function(req, res) {
  res.render('smooth', {

  });
})


