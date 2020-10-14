const express           = require('express');
const router            = express.Router()
const recordsConstoller = require('../controllers/records.controller')

module.exports          = router;

router.post('/records', recordsConstoller.getRecords);
router.get('/', recordsConstoller.sayHi);