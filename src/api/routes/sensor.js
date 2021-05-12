const { Router } = require('express');
const tokenCheck = require('../middlewares/tokenCheck');
const router = Router();

const SensorController = require('../controllers/SensorController');

router.get('/sensor', tokenCheck, SensorController.getAll);
router.post('/sensor', tokenCheck, SensorController.insert);
router.put('/sensor/:id', tokenCheck, SensorController.update);
router.delete('/sensor/:id', tokenCheck, SensorController.delete);

module.exports = router;
