// Here will be the database connection
// ....

// Simulate db
const sensorsDATA = [
	{
		id: 'TEMP1',
		values: [
			{
				value: 30,
				date: Date.now(),
			},
		],
	},
	{
		id: 'TEMP2',
		values: [
			{
				value: 30,
				date: Date.now(),
			},
		],
	},
	{
		id: 'HUM1',
		values: [
			{
				value: 30,
				date: Date.now(),
			},
		],
	},
];

const getSensorsLastValues = () => {
	return sensorsDATA.map(({ id, values }) => {
		return {
			id,
			value: values.slice(-1)[0],
		};
	});
};

const registerSensorValue = (sensorData) => {
	const sensorIndex = sensorsDATA.findIndex((sensor) => sensor.id === sensorData.sensorID);
	sensorsDATA[sensorIndex].values.push({ value: sensorData.value, date: Date.now() });
};

module.exports = {
	getSensorsLastValues,
	registerSensorValue,
};
