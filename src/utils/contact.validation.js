const Joi  = require('joi');
const validation = require ('express-validation');

const bodyValidation = {
  name: Joi.string().required(),
  address: Joi.string().required(),
  contactNumber: Joi.string().required(),
  email: Joi.string().required()
};

function create () {
  return validation({
    body: bodyValidation
  });
}

function update () {
  return validation({
    body: bodyValidation
  });
}

module.exports = { create, update };
