const express = require('express');
const path = require('path');
const ejs = require('ejs');
const PORT = process.env.PORT || 5000;

const {Pool} = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

const VIEWS = path.join(__dirname, 'views');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', VIEWS)
    .set('view engine', 'ejs')
    .use(express.static('public'))
    .use(express.static(path.join(__dirname, 'public')))
    .get('/', (req, res) => {
        let allQuery = `SELECT * FROM tokimon`;

        pool.query(allQuery, (error, result) => {
            if (error) {
                res.end(error.toString());
            } else {
                let results = {'tokimon': result.rows};
                res.render('menu', results);
            }
        });
    })
    .get('/add', (req, res) => {
        res.render('add');
    })
    .get('/tokimon/:id', (req, res) => {
        let idQuery = `SELECT * FROM tokimon WHERE id=${req.params.id};`;

        pool.query(idQuery, (error, result) => {
            if (error) {
                res.end(error.toString());
            } else {
                let results = {'tokimon': result.rows[0]};
                res.render('tokimon', results);
            }
        })
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
