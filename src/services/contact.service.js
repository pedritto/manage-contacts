const Contact = require('../models/contact.schema');
const contactFactory = require('../utils/contact.factory');

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
    .then(([pages, contacts]) => {
      response.json({ pages, contacts });
    })
    .catch(error => next(error));
}

function create (request, response, next) {
  const contact = contactFactory.createModel(request.body);

  contact.save ()
    .then(newContact => response.json(newContact))
    .catch(error => next(error));
}

function update (request, response, next) {
  const contact = contactFactory.createModel(request.body, request.contact);

  contact.save()
    .then(updatedContact => response.json(updatedContact))
    .catch(error => next(error));
}

function remove (request, response, next) {
  const contact = request.contact;
  contact.remove()
    .then(deletedContact => response.json(deletedContact))
    .catch(error => next(error));
}

function history (request, response, next) {
  const contact = request.contact;
  Contact.history(contact._id)
    .then(history => response.json(history))
    .catch(error => next(error));
}

module.exports = { load, list, create, update, remove, history };
