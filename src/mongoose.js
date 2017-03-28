const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const Promise = require('bluebird');

const config = require('../conf/app');

mongoose.Promise = Promise;

if (process.env.NODE_ENV === 'test') {
  const mockgoose = new Mockgoose(mongoose);

  mockgoose.prepareStorage().then(() => {
    mongoose.connect(config.mongodb.uri);
  });
} else {
  mongoose.connect(config.mongodb.uri);
}

module.exports = mongoose;
