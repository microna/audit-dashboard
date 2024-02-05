import React, { useState } from "react";

export const TableItem = (props) => {
  const [selectedStatus, setSelectedStatus] = useState([]);

  const statusColors = {
    "No risk": "bg-green-300",
    "Medium risk": "bg-yellow-300",
    "At risk": "bg-red-300",
    "N/a": "bg-gray-300",
  };

  const handleStatusChange = (index, value) => {
    const newSelectedStatus = [...selectedStatus];
    newSelectedStatus[index] = value;
    setSelectedStatus(newSelectedStatus);
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < props.rowCount; i++) {
      const selectedColor = statusColors[selectedStatus[i]] || "";
      rows.push(
        <tr key={i} className={`bg-white dark:bg-gray-800 ${selectedColor}`}>
          <td className="px-4 py-2">
            <input type="text" defaultValue="default" />
          </td>
          <td className="py-2 flex">
            <input className="w-[100px]" type="text" defaultValue="default" />
            <select
              className="w-[50px]"
              name=""
              id=""
              onChange={(e) => handleStatusChange(i, e.target.value)}
            >
              <option value="No risk">No risk</option>
              <option value="Medium risk">Medium risk</option>
              <option value="At risk">At risk</option>
              <option value="N/a">N/a</option>
            </select>
          </td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-[100%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-3 py-3">
              {props.title}
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};
