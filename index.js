/*
The contents of this file are taken directly from here:
https://github.com/expressjs/express/issues/3378
I am currently testing this mostly unedited
to see if it makes Heroku work
*/

var express = require('express');
var app = express();
var path = require('path');
const VIEWS = path.join(__dirname, 'views');
var port = process.env.PORT || 8080;

app.set('views', VIEWS);
app.set('view engine', 'html');
app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile('calculator.html', { root : VIEWS });
});

app.listen(port, function () {
  console.log('Example app listening on 8080!');
});