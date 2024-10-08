import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#4472c4", "#ed7d31"];

const RADIAN = Math.PI / 180;

const RenderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  labels,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {labels[index]} {/* {`${(percent * 100).toFixed(0)}`}  */}
    </text>
  );
};

export const PieChartWithCustomizedLabel = ({ support, overdue }) => {
  const total = support + overdue;
  const data = [
    { name: "Group A", value: (support / total) * 100 },
    { name: "Group B", value: (overdue / total) * 100 },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%" maxHeight={180}>
      <PieChart width={400} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={<RenderCustomizedLabel labels={[support, overdue]} />}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
