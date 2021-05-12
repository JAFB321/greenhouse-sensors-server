const Controller = require('./Controller');
const MeasureTypeService = require('../services/MeasureTypeService');
const MeasureType = require('../models/MeasureType');

const measureTypeService = new MeasureTypeService(MeasureType.getInstance());

class MeasureTypeController extends Controller {
	constructor(service) {
		super(service);
	}
}

module.exports = new MeasureTypeController(measureTypeService);
