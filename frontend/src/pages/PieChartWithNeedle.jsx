/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';


const RADIAN = Math.PI / 180;
const data = [
  { name: 'A', value: 0, color: 'red' },
  { name: 'B', value: 180, color: 'green',},
];


export const PieChartWithNeedle = () => {


  const [inputValue, setInputValue] = useState('');
  const [inputDataValue, setInputDataValue] = useState(0)
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputDataValue(inputValue)

    data.map(item => {
            if (item.name === 'A') {
            item.value = parseInt(inputValue)
            }
            if(item.name === 'B'){
              item.value =  180 - parseInt(inputValue)
            }
            console.log(data);
            console.log( parseInt(inputValue));
          });
  };



  
 


const cx = 150; //postion x
const cy = 130; //postion y
const iR = 50; // fill radius
const oR = 100;
const value = 10;

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
      <path key="path" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
    ];
  };

  return (
    <>
      <PieChart width={300} height={150}>
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
        {needle(inputDataValue, data, cx, cy, iR, oR, '#d0d000')}
      </PieChart>

      <div className="flex items-center justify-between w-[300px]">
        <p className=''>At risk</p>
        <p className=''>At risk</p>
      </div>

    <form 
    onSubmit={handleSubmit}
    action="">
    <input
        // ref={textInput}
        // onChange={}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="number"
      />
      <button 
      type='submit'
      className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Submit</button>
      </form>
      
   
    </>
  );
};
