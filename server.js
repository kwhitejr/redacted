var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('views', 'views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extend: false}));

app.use(express.static('public'));


app.route('/')
  .get(function (req, res) {
    console.log('rendering index.jade...');
    res.render('index', {pageTitle: 'Msg Converter'});
  })
  .post(
    validateMessage,
    messageConverter,
    function (req, res) {
      // sends the object containing the res.locals variables
      res.render('result', res.locals);
    });

function validateMessage(req, res, next) {
  if (!req.body.msg) {
    res.status(400);
    // sending both writes and ends the connection/stream
    return res.render('result', {errMsg: 'Please provide a \'msg\''});
  }
  res.locals.msg = req.body.msg;
  return next();
}

function messageConverter(req, res, next) {
  var censorship = {
    'selfie': 'self-portrait',
    'yummers': 'delicious',
    'outchea': 'are out here',
    'bruh': 'wow',
    'doge': 'pug',
    'cilantro': 'soap',
    'bae': 'loved one',
    'swag': 'style',
    'yolo': 'carpe diem'
  };
  for (var word in censorship) {
    // Modify this code to refine the search-and-replace functionality.
    var oldWord = new RegExp(word, 'gi');
    res.locals.msg = res.locals.msg.replace(oldWord, censorship[word]);
  }
  console.log('this is res locals: ', res.locals);
  return next();
}

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server listening on port ' + port);
});