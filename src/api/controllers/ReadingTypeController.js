const Controller = require('./Controller');
const ReadingTypeService = require('../services/ReadingTypeService');
const ReadingType = require('../models/ReadingType');

const readingTypeService = new ReadingTypeService(ReadingType.getInstance());

class ReadingTypeController extends Controller {
	constructor(service) {
		super(service);
	}
}

module.exports = new ReadingTypeController(readingTypeService);
