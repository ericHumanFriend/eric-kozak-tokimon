const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile('calculator.html', { root : path.join(__dirname, 'views') })
});
app.listen(8080, function() {
    console.log(`Listening on 8080`)
});