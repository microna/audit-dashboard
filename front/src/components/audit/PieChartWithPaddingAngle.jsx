import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const checkStatusState = (componentData) => {
  if (componentData >= 100) {
    return { text: "Good", color: "#DE8344" };
  } else if (componentData >= 50) {
    return { text: "Normal", color: "#4599CF" };
  } else {
    return { text: "Not Good", color: "#F5C342" };
  }
};

export const PieChartWithPaddingAngle = ({ componentData, status }) => {
  const data = [
    { name: "Group A", value: componentData },
    { name: "Group B", value: 100 - componentData },
  ];

  const statusState = checkStatusState(componentData);

  const COLORS = [statusState.color, "#f1f1f1"];

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
          color: checkStatusState(componentData),
          top: "37%",
          left: "56%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {componentData}%
      </div>
      <div className="">
        <div className="text-center">30 Days Backup Success Rate</div>
        <div
          className="text-center font-bold"
          style={{ color: statusState.color }}
        >
          {statusState.text}
        </div>
      </div>
    </div>
  );
};
