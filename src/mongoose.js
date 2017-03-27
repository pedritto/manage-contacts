const config = require('../conf/app');
const mongoose = require('mongoose');

mongoose.connect(config.mongodb.uri);

module.exports = mongoose;
