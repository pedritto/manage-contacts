const express = require('express');

const app = express();

app.get('/api/v1', function (req, res) {
    res.json({message: 'It works!'});
});

module.exports = app;
