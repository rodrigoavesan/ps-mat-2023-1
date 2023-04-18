const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer_tag')

router.post('/', controller.create)
router.get('/', controller.retrive)
router.get('/:id', controller.retriveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)


module.exports = router;
