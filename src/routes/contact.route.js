const express =  require('express');
const service = require('../services/contact.service');

const router = express.Router();

router.route('/')
  .get(service.list)
  .post(service.create);

router.route('/:id')
  .put(service.update)
  .delete(service.remove);

router.route('/:id/history')
  .get(service.history);

router.param('id', service.load);

module.exports = router;
