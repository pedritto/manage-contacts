const express = require('express');
const service = require('../services/contact.service');
const validate = require ('../utils/contact.validation');

const router = express.Router();

router.route('/')
  .get(service.list)
  .post(validate.create(), service.create);

router.route('/:id')
  .put(validate.update(), service.update)
  .delete(service.remove);

router.route('/:id/history')
  .get(service.history);

router.param('id', service.load);

module.exports = router;
