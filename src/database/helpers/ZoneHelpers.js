const checkHealth = (plant, sensors) => {
	try {
		const status = {
			ok: true,
			warnings: [], // {plantParameter, sensor}
		};

		for (let sensor of sensors) {
			for (let param of plant.PlantParameters) {
				const { lastValue, ReadingType: sensorType } = sensor;
				const { minValue, maxValue, readingType: paramType } = param;

				if (sensorType._id.toString() === paramType._id.toString()) {
					if (lastValue > maxValue || lastValue < minValue) {
						status.ok = false;

						status.warnings.push({
							sensorId: sensor._id,
						});
					}
				}
			}
		}

		return status;
	} catch (error) {
		return {};
	}
};

module.exports = { checkHealth };
