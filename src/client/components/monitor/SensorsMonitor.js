import React, { useEffect, useState } from "react";
import { SensorCard } from "./SensorCard";
import socketIOClient from "socket.io-client";

export const SensorsMonitor = () => {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    const socket = socketIOClient("ws://localhost:8080", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "header",
      },
    });
    socket.on("sensor", function (data) {
      // data:
      //	[
      // 		{ id: 'EXAMPLE', value: { value: 312, date: 'date' } },
      //  	{ id: 'EXAMPLE2', value: { value: 324, date: 'date' } }
      // ];
      // (check src/database.js)
      var sensors = JSON.parse(data);
      setSensors(sensors);
    });
  }, []);

  return (
    <>
      <div className="moinitor__main">
        <div className="container">
          <div className="monitor__box-container card">
            <img
              className="logo align-center"
              src="greenhouse.svg"
              alt="greenhouse icon"
            />
            <h1 className=" text-center title_primary">
              Greenhouse Sensor Monitor
            </h1>
            <div className="sensor_card-grid">
              {sensors.map((sensor) => (
                <SensorCard
                  key={sensor.id}
                  sensorID={sensor.id}
                  sensorType="Temperature"
                  value={sensor.value.value}
                  valueType="Celcius"
                />
              ))}

              {/* <SensorCard
                sensorID="TEMP1"
                sensorType="Temperature"
                value={38}
                valueType="Celcius"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
