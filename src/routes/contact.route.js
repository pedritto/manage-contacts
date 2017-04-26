const express = require('express');
const controller = require('../controllers/contact.controller');
const validate = require ('../utils/contact.validation');

const router = express.Router();

router.route('/')
  .get(controller.list)
  .post(validate.create(), controller.create);

router.route('/:id')
  .put(validate.update(), controller.update)
  .delete(controller.remove);

router.route('/:id/history')
  .get(controller.history);

router.param('id', controller.load);

module.exports = router;
