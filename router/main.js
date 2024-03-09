// main.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/About', (req, res) => {
    res.render('about');
});

router.get('/Contract', (req, res) => {
    res.render('contract');
});

module.exports = router;