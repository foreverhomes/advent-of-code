'use strict';

var express = require('express');
var app = express();
var port = 4000;
/* days */
var day1 = require('./01/index.js');
var day2 = require('./02/index.js');

app.get('/day1', function (req, res) {
  var answer1_1 = day1.getPart1();
  var answer1_2 = day1.getPart2();
  res.send('Part 1: ' + answer1_1 + ', Part 2: ' + answer1_2);
});

app.get('/day2', function (req, res) {
  var answer1 = day2.getPart1();
  var answer2 = day2.getPart2();
  res.send('Part 1: ' + answer1 + ', Part 2: ' + answer2);
});

app.listen(port, function () {
  return console.log('Example app listening on port ' + port + '!');
});