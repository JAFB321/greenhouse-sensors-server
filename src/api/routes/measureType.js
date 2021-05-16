const { Router } = require('express');
const tokenCheck = require('../middlewares/tokenCheck');
const router = Router();

const MeasureTypeController = require('../controllers/MeasureTypeController');

router.get('/measureType/:id', tokenCheck, MeasureTypeController.get);
router.get('/measureType', tokenCheck, MeasureTypeController.getAll);
router.post('/measureType', tokenCheck, MeasureTypeController.insert);
router.put('/measureType/:id', tokenCheck, MeasureTypeController.update);
router.delete('/measureType/:id', tokenCheck, MeasureTypeController.delete);

module.exports = router;
