const Promise = require('bluebird');
const mongooseHistory = require('mongoose-history');
const httpStatus = require('http-status');

const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const historyOptions = {
  indexes: [{
    't': -1,
    'd._id': 1
    }]
};

const ContactSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    contactNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    partnerId: {
      type: Number,
      required: false
    },
    picture: {
      type: String,
      required: false
    },
});

function notFound () {
  const error = new Error('Contact not found');
  error.status = httpStatus.NOT_FOUND;
  return Promise.reject(error);
}

ContactSchema.statics = {

  get (id) {
    return this.findById(id)
      .exec()
      .then(contact => {
        if (contact) {
          return contact;
        }
        return notFound();
      });
  },

  list ({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .exec();
  },

  count () {
    return this.where({})
      .count()
      .exec();
  },

  history (id) {
    return this.historyModel()
      .find({ 'd._id': id })
      .exec()
      .then(history => {
        if (history) {
          return history;
        }
        return notFound();
      });
  }

};

ContactSchema.plugin(mongooseHistory, historyOptions);

module.exports = mongoose.model('contact', ContactSchema);
