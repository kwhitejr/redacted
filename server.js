var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extend: false}));

app.use(function (req, res, next) {
  console.log('The parsed body is: ');
  console.log(req.body);
  return next();
});

app.route('/')
  .get(function (req, res) {

  })
  .post(function (req, res) {

  });

function messageConverter(msg) {
  var censorship = [
    {'selfie': 'self-portrait'},
    {'yummers': 'delicious'},
    {'outchea': 'are out here'},
    {'bruh': 'wow'},
    {'doge': 'pug'},
    {'cilantro': 'soap'},
    {'bae': 'loved one'},
    {'swag': 'style'},
    {'yolo': 'carpe diem'}
  ];
  censorship.forEach(function (pair) {
    msg.replace(pair, pair[key]);
  });
}

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server listening on port ' + port);
});