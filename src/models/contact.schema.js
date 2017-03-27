const Promise  = require('bluebird');
const mongoose = require('../mongoose');
const Schema   = mongoose.Schema;

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
    friendlyName: {
      type: String,
      required: false
    },
});

ContactSchema.statics = {

  get (id) {
    return this.findById(id)
      .exec()
      .then(contact => {
        if (contact) {
          return contact;
        }
        return Promise.reject();
      });
  },

  list ({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .exec();
  },

  history () {
    // TODO: implement history
    return Promise.reject();
  }
};

module.exports = mongoose.model('contact', ContactSchema);
