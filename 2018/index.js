const express = require('express')
const app = express()
const port = 4000
/* days */
const day1 = require('./01/index.js');
const day2 = require('./02/index.js');
const day3 = require('./03/index.js');
const day4 = require('./04/index.js');
const day5 = require('./05/index.js');

app.get('/day1', (req, res) => {
  const answer1_1 = day1.getPart1();
  const answer1_2 = day1.getPart2();
  res.send(`Part 1: ${answer1_1}, Part 2: ${answer1_2}`);
});

app.get('/day2', (req, res) => {
  const answer1 = day2.getPart1();
  const answer2 = day2.getPart2();
  res.send(`Part 1: ${answer1}, Part 2: ${answer2}`);
})

app.get('/day3', (req, res) => {
  const answers = day3.getAnswers();
  res.send(`Part 1: ${answers.totalOverlap}, Part 2: ${answers.intactSquareId}`);
})

app.get('/day4', (req, res) => {
  day4.run();
  res.send(`ran successfully`);
})

app.get('/day5', (req, res) => {
  const polymer = day5.run();
  res.send(`ran successfully`);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))