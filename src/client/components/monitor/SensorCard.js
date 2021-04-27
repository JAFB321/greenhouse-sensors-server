import React from "react";

export const SensorCard = ({ sensorID, sensorType, value, valueType }) => {
  return (
    <div className="sensor_card card">
      <img
        className="sensor_card-logo"
        src={
          sensorType === "Temperature"
            ? "global-warming.svg"
            : "clean-water.svg"
        }
        alt=""
      />
      <h3 className="sensor_card-title text-center">{sensorID}</h3>

      <p className="card">
        <span className="sensor_card-info">{sensorType}:</span>
        <span className="sensor_card-info_value">
          {"  "}
          {value} {valueType}
        </span>
      </p>
    </div>
  );
};
