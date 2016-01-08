var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extend: false}));

app.use(function (req, res, next) {
  console.log('The parsed body is: ');
  console.log(req.body);
  return next();
});

app.use('/',
  validateMessage,
  messageConverter
);

app.route('/')
  .get(function (req, res) {
    console.log('rendering index.jade...');
    res.render('index', {pageTitle: msgConverter});
  })
  .post(function (req, res) {
    res.send(res.locals.msg);
  });

function validateMessage(req, res, next) {
  if (!req.body.msg) {
    res.status(400);
    // sending both writes and ends the connection/stream
    return res.send('Please provide a \'msg\'');
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