const express = require('express');
const router = express.Router();
const controller = require('../controllers/user')

router.post('/', controller.create)
router.get('/', controller.retrive)

module.exports = router;
