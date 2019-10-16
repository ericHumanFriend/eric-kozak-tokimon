const express = require('express');
const path = require('path');
const {Pool} = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});
const PORT = process.env.PORT || 5050;

const VIEWS = path.join(__dirname, 'views');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', VIEWS)
    .set('view engine', 'html')
    .use(express.static('public'))
    .use(express.static(path.join(__dirname, 'public')))
    .get('/', (req, res) => {
        let query = 'SELECT * FROM tokimon';

        pool.query(query, (error, result) => {
            if (error) {
                res.end(error);
            }
            let results = {'tokimon': result.rows};
            res.render('views/menu', results)
        });
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`));