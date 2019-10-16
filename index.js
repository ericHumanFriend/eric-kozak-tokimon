const express = require('express');
const path = require('path');
const {Pool} = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});
const PORT = process.env.PORT || 8080;

const VIEWS = path.join(__dirname, 'views');

console.log("DATABASE_URL:")
console.log(process.env.DATABASE_URL);

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', VIEWS)
    .set('view engine', 'html')
    .use(express.static('public'))
    .use(express.static(path.join(__dirname, 'public')))
    .get('/', (req, res) => {

        let query = `SELECT * FROM tokimon`;

        pool.query(query, (error, result) => {
            console.log("oh no");
            if (error) {
                res.end(error);
            }
            let results = {'tokimon': result.rows};
            res.render('views/menu', results)
        });
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
