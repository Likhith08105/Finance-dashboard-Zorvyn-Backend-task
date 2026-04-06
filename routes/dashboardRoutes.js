// Dashboard routes
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const role = require('../middleware/role');

router.get('/summary', role(['analyst', 'admin']), dashboardController.getSummary);

module.exports = router;
