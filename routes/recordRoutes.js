// Record routes
const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const role = require('../middleware/role');

router.post('/', role(['admin']), recordController.createRecord);
router.get('/', role(['viewer', 'analyst', 'admin']), recordController.getRecords);
router.put('/:id', role(['admin']), recordController.updateRecord);
router.delete('/:id', role(['admin']), recordController.deleteRecord);

module.exports = router;
