const Contact = require('../models/contact.schema');

function createModel (body, model = new Contact()) {
  return Object.assign(model, body);
}

module.exports = { createModel };
