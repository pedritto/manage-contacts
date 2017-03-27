const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contact.route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/api/v1/contacts', contactRoutes);

module.exports = app;
