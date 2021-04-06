var socket = io.connect('http://localhost:3000', { forceNew: true });

socket.on('sensor', function (data) {
	// data:
	//	[
	// 		{ id: 'EXAMPLE', values: { value: 312, date: 'date' } },
	//  	{ id: 'EXAMPLE2', values: { value: 324, date: 'date' } }
	// ];
	// (check src/database.js)

	var sensors = JSON.parse(data);
	var sensorList = document.getElementById('sensors');

	console.log(sensors);

	var info = '';
	sensors.forEach(({ id, value }) => {
		info += `<p>${id}: ${value.value}</p>`;
	});
	sensorList.innerHTML = info;
});
