const Controller = require('./Controller');
const ZoneService = require('../services/ZoneService');
const Zone = require('../models/Zone');

const zoneService = new ZoneService(Zone.getInstance());

class ZoneController extends Controller {
	constructor(service) {
		super(service);
	}
}

module.exports = new ZoneController(zoneService);
