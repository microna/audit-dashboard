import React, { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

export const PieChartWithPaddingAngle = ({ componentData, status }) => {
  const data = [
    { name: "Group A", value: componentData },
    { name: "Group B", value: 100 - componentData },
  ];

  let statusState;
  if (componentData >= 100) {
    statusState = "Good";
  } else if (componentData >= 50) {
    statusState = "Normal";
  } else {
    statusState = "Not Good";
  }

  let statusColor;
  if (statusState === "Normal") {
    statusColor = "#DE8344";
  } else if (statusState === "Not Good") {
    statusColor = "#F5C342";
  } else {
    statusColor = "#4599CF";
  }

  const COLORS = [statusColor, "#f1f1f1"];

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="90%"
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          position: "absolute",
          color: statusColor,
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {componentData}%
      </div>
      <div className="">
        <div className="text-center">30 Days Backup Success Rate</div>
        <div className="text-center font-bold" style={{ color: statusColor }}>
          {statusState}
        </div>
      </div>
    </div>
  );
};
