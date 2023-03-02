const express = require('express');
const { retrive } = require('../controllers/user');
const router = express.Router();
const controller = require('../controllers/user')

router.post('/', controller.create)
router.get('/', controller.retrive)
router.get('/:id', controller.retriveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)


module.exports = router;
