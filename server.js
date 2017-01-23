var express = require('express');
var exphbs = require('express-handlebars')

var app = express();
app.set('port', process.env.PORT || 8000);
app.use(express.static(__dirname + '/public'));

// Set up handlebars view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Homepage
app.get('/', function (req, res) {
  res.render('home');
})

// Who Am I, result page
app.get('/whoami', function (req, res) {
  var result = {};
  console.log(req.headers)
  var IP = req.headers.host;
  var language = req.headers["accept-language"].slice(0, 5);
  var regexp = /\((.*?)\)/;
  var software = req.headers["user-agent"].match(regexp)[1];
  
  console.log(typeof language);
  result = {
    IP,
    language,
    software
  }
  result = JSON.stringify(result);
  console.log(result);
  res.render('result', {
    result: result
  });
})

// Custom 404 page
app.use(function (req, res) {
  console.log('404');
  res.status(404);
  res.render('404');
})

// Custom 500 page
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
})

app.listen(app.get('port'), function () {
  console.log('Express server started on http://localhost:' + app.get('port') + '. Press Ctrl-C to terminate connection.');
});