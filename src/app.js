const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');

const contactRoutes = require('./routes/contact.route');
const partnerRoutes = require('./routes/partner.route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(methodOverride());

app.use(cors());

app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/partners', partnerRoutes);

module.exports = app;
