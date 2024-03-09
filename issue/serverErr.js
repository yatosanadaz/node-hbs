// serverErr.js
const express = require('express');
const router = express.Router();

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = router;