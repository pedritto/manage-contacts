const httpStatus = require('http-status');

const Contact = require('../models/contact.schema');
const contactFactory = require('../utils/contact.factory');
const contactResponse = require('../utils/contact.response');

function load (request, response, next, id) {
  Contact.get(id)
    .then((contact) => {
      request.contact = contact;
      return next();
    })
    .catch(error => next(error));
}

function list (request, response, next) {
  const limit = parseInt(request.query.limit);
  const skip  = parseInt(request.query.skip);

  Promise.all([
      Contact.count(),
      Contact.list({ limit, skip })
    ])
    .then(([count, list]) => {
      const contacts = contactResponse.convertAll(list);
      response.json({ count, contacts });
    })
    .catch(error => next(error));
}

function create (request, response, next) {
  const contact = contactFactory.createModel(request.body);

  contact.save ()
    .then(newContact => {
      const data = contactResponse.convert(newContact);
      response.status(httpStatus.CREATED).json(data);
    })
    .catch(error => next(error));
}

function update (request, response, next) {
  const contact = contactFactory.createModel(request.body, request.contact);

  contact.save()
    .then(updatedContact => {
      const data = contactResponse.convert(updatedContact);
      response.json(data);
    })
    .catch(error => next(error));
}

function remove (request, response, next) {
  const contact = request.contact;
  contact.remove()
    .then(deletedContact => {
      const data = contactResponse.convert(deletedContact);
      response.json(data);
    })
    .catch(error => next(error));
}

function history (request, response, next) {
  const contact = request.contact;
  Contact.history(contact._id)
    .then(history => response.json(history))
    .catch(error => next(error));
}

module.exports = { load, list, create, update, remove, history };
