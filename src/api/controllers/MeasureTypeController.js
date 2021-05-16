const Controller = require('./Controller');
const MeasureTypeService = require('../../database/services/MeasureTypeService');
const MeasureType = require('../../database/models/MeasureType');

const measureTypeService = new MeasureTypeService(MeasureType.getInstance());

class MeasureTypeController extends Controller {
	constructor(service) {
		super(service);
	}
}

module.exports = new MeasureTypeController(measureTypeService);
