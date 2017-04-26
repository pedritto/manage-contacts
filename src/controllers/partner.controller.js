const partnerService = require('../services/partner.service');

function list (request, response, next) {
  partnerService()
  .then(partners => {
      response.json({ partners });
    })
  .catch(error => next(error));
}

module.exports = { list };