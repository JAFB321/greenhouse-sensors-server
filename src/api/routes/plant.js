const { Router } = require('express');
const tokenCheck = require('../middlewares/tokenCheck');
const router = Router();

const PlantController = require('../controllers/PlantController');

router.get('/plant', tokenCheck, PlantController.getAll);
router.post('/plant', tokenCheck, PlantController.insert);
router.put('/plant/:id', tokenCheck, PlantController.update);
router.delete('/plant/:id', tokenCheck, PlantController.delete);

module.exports = router;
