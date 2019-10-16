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
    .use(express.json())
    .use(express.urlencoded({extended: false}))
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
    .post('/add', (req, res) => {
        let toki = req.body.toki;
        let weight = parseFloat(req.body.weight);
        let height = parseFloat(req.body.height);
        let fly = parseInt(req.body.fly);
        let fight = parseInt(req.body.fight);
        let fire = parseInt(req.body.fire);
        let water = parseInt(req.body.water);
        let electric = parseInt(req.body.electric);
        let ice = parseInt(req.body.ice);
        let trainer = req.body.trainer;

        let total = fly + fight + fire + water + electric + ice;

        let addQuery = `INSERT INTO tokimon VALUES (DEFAULT, '${toki}', ${weight}, ${height},
        ${fly}, ${fight}, ${fire}, ${water}, ${electric}, ${ice}, ${total}, '${trainer}')
        RETURNING id`;

        pool.query(addQuery, (error, result) => {
            if (error) {
                res.end(error.toString());
            } else {
                let results = result.rows[0];
                res.redirect(`/tokimon/${results.id}`)
            }
        })
    })
    .get('/tokimon/:id', (req, res) => {
        let idQuery = `SELECT * FROM tokimon WHERE id=${req.params.id}`;

        pool.query(idQuery, (error, result) => {
            if (error) {
                res.end(error.toString());
            } else {
                let results = {'tokimon': result.rows[0]};
                res.render('tokimon', results);
            }
        })
    })
    .post('/delete/:id', (req, res) => {
        let idQuery = `DELETE FROM tokimon WHERE id=${req.params.id}`;

        pool.query(idQuery, (error, result) => {
            if (error) {
                res.end(error.toString());
            } else {
                res.redirect('/');
            }
        })
    })
    .post('/edit/:id', (req, res) => {
        let idQuery = `SELECT * FROM tokimon WHERE id=${req.params.id}`;

        pool.query(idQuery, (error, result) => {
            if (error) {
                res.end(error.toString());
            } else {
                let results = {'tokimon': result.rows[0]};
                res.render('edit', results);
            }
        })
    })
    .post('/update/:id', (req, res) => {
        let toki = req.body.toki;
        let weight = parseFloat(req.body.weight);
        let height = parseFloat(req.body.height);
        let fly = parseInt(req.body.fly);
        let fight = parseInt(req.body.fight);
        let fire = parseInt(req.body.fire);
        let water = parseInt(req.body.water);
        let electric = parseInt(req.body.electric);
        let ice = parseInt(req.body.ice);
        let trainer = req.body.trainer;

        let total = fly + fight + fire + water + electric + ice;

        let updateQuery = `UPDATE tokimon SET name='${toki}', weight=${weight},
        height=${height}, fly=${fly}, fight=${fight}, fire=${fire}, water=${water},
        electric=${electric}, ice=${ice}, total=${total}, trainer='${trainer}'
        WHERE id=${req.params.id}`;

        pool.query(updateQuery, (error, result) => {
            if (error) {
                res.end(error.toString());
            } else {
                res.redirect(`/tokimon/${req.params.id}`)
            }
        })
    })
    .post('/duplicate/:id', (req, res) => {
        let cloneQuery = `INSERT INTO tokimon (name, weight, height, fly, fight,
        fire, water, electric, ice, total, trainer)
        SELECT name, weight, height, fly, fight, fire, water, electric, ice, total, trainer
        FROM tokimon WHERE id=${req.params.id}`;

        pool.query(cloneQuery, (error, result) => {
            if (error) {
                res.end(error.toString());
            } else {
                res.redirect(`/`);
            }
        })
    })

    .listen(PORT, () => console.log(`Listening on ${PORT}`));
