import React, { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const initialData = [
  { name: "Group A", value: 0 },
  { name: "Group B", value: 100 },
];

const color = "red";

export const PieChartWithPaddingAngle = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [inputDataValue, setInputDataValue] = useState(0);
  const [data, setData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValueNumber = parseInt(inputValue);
    setInputDataValue(`${inputValueNumber}%`);

    const newData = data.map((item) => {
      if (item.name === "Group A") {
        return { ...item, value: inputValueNumber };
      }
      if (item.name === "Group B") {
        return { ...item, value: 100 - inputValueNumber };
      }
      return item;
    });

    setData(newData);
  };

  const COLORS = ["green", "#f1f1f1"];

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
          color: "#0088FE",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {inputDataValue}
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <input
            className="w-[100px]"
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Click
          </button>
        </form>
      </div>
    </div>
  );
};
