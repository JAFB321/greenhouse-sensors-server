const { Router } = require('express');
const tokenCheck = require('../middlewares/tokenCheck');
const router = Router();

const ZoneController = require('../controllers/ZoneController');

router.post('/zone/:zoneId/sensors', tokenCheck, ZoneController.addSensor);
router.delete('/zone/:zoneId/sensors/:sensorId', tokenCheck, ZoneController.deleteSensor);

router.post('/zone/:zoneId/plants', tokenCheck, ZoneController.addPlant);
router.delete('/zone/:zoneId/plants/:plantId', tokenCheck, ZoneController.deletePlant);

router.get('/zone/:id/health', tokenCheck, ZoneController.getZoneHealth);
router.get('/zone/:id/warnings', tokenCheck, ZoneController.getWarnings);

router.get('/zone/:id', tokenCheck, ZoneController.get);
router.get('/zone', tokenCheck, ZoneController.getAll);
router.post('/zone', tokenCheck, ZoneController.insert);
router.put('/zone/:id', tokenCheck, ZoneController.update);
router.delete('/zone/:id', tokenCheck, ZoneController.delete);

module.exports = router;
