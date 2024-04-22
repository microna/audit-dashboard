import axios from "../../api";
import { PieChart, Pie, Cell } from "recharts";

let colors = {
  color1: "#DE8344",
  color2: "#F5C342",
  color3: "#7EAB55",
  color4: "#4599CF",
};
const RADIAN = Math.PI / 180;

export const PieChartWithNeedle = ({ componentData, title }) => {
  const data = [
    {
      name: "A",
      value: componentData,
      color:
        componentData >= 75
          ? colors.color4
          : componentData >= 50
            ? colors.color3
            : componentData >= 35
              ? colors.color2
              : colors.color1,
    },
    { name: "B", value: 100 - componentData, color: "#f1f1f1" },
  ];

  const cx = 150; //postion x
  const cy = 130; //postion y
  const iR = 50; // fill radius
  const oR = 100;
  const value = componentData;

  const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path
        key="path"
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="#none"
        fill={color}
      />,
    ];
  };

  return (
    <div className="border border-solid border-grey rounded-md shadow-md">
      <PieChart width={300} height={190}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle(value, data, cx, cy, iR, oR, "#d0d000")}
      </PieChart>

      <div className="flex items-center justify-between w-[300px]">
        <p className="">At risk</p>
        <p className="">Protected</p>
      </div>
      <div className="text-xl text-center mb-4">{title}</div>
    </div>
  );
};
