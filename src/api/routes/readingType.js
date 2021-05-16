const { Router } = require('express');
const tokenCheck = require('../middlewares/tokenCheck');
const router = Router();

const ReadingTypeController = require('../controllers/ReadingTypeController');

router.get('/readingType/:id', tokenCheck, ReadingTypeController.get);
router.get('/readingType', tokenCheck, ReadingTypeController.getAll);
router.post('/readingType', tokenCheck, ReadingTypeController.insert);
router.put('/readingType/:id', tokenCheck, ReadingTypeController.update);
router.delete('/readingType/:id', tokenCheck, ReadingTypeController.delete);

module.exports = router;
