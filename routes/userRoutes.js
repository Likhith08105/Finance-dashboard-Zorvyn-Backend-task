// User routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const role = require('../middleware/role');

router.post('/', role(['admin']), userController.createUser);
router.get('/', role(['admin']), userController.listUsers);

module.exports = router;
