/*
The contents of this file are copied directly from Nick Yang's work temporarily only in an attempt
to find any way to get Heroku to work. It will be replaced with my original work as soon as possible.
*/

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const VIEWS = path.join(__dirname, 'views');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', VIEWS)
  .set('view engine', 'html')
  .use(express.static('public'))
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.sendFile('calculator.html', { root : VIEWS }))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
