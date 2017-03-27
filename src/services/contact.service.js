const Contact = require('../models/contact.schema');

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

  Contact.list({ limit, skip })
    .then(contacts => response.json(contacts))
    .catch(error => next(error));
}

function create (request, response, next) {

  const body = request.body;
  const contact = new Contact({
    name: body.name,
    address: body.address,
    contactNumber: body.contactNumber,
    email: body.email,
    friendlyName: body.friendlyName
  });

  contact.save ()
    .then(newContact => response.json(newContact))
    .catch(error => next(error));
}

function update (request, response, next) {
  const contact = request.contact;
  const body = request.body;

  contact.name = body.name;
  contact.address = body.address;
  contact.contactNumber = body.contactNumber;
  contact.email = body.email;
  contact.friendlyName = body.friendlyName;

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
  contact.history()
    .then(history => response.json(history))
    .catch(error => next(error));
}

module.exports = { load, list, create, update, remove, history };
