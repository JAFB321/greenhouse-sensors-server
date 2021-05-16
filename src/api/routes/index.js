const express = require('express');
const router = express.Router();

router.use('/', require('./users'));
router.use('/', require('./plant'));
router.use('/', require('./readingType'));
router.use('/', require('./measureType'));
router.use('/', require('./sensor'));
router.use('/', require('./sensor'));
router.use('/', require('./zone'));

module.exports = router;
