import React, { useState } from "react";

const statusColors = {
  "No risk": "bg-green-300",
  "Medium risk": "bg-yellow-300",
  "At risk": "bg-red-300",
  "N/a": "bg-gray-300",
};

const securityTableTiles = {
  title1: "Multi factor authentication implemented Protected",
  title2: "Security training given to end users when onboarded/regularly",
  title3: "Accounts audited, disabled and deleted –oldest password/account",
  title4: "Vulnerability Management Status",
  title5: "Mobile Device Management implemented & level of compliance",
};

export const TableItem = ({
  statusRow1,
  statusRow2,
  statusRow3,
  statusRow4,
  statusRow5,
  tableTitle,
  titleRow1,
  titleRow2,
  titleRow3,
  titleRow4,
  titleRow5,
}) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-[100%] text-[12px] text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-3 py-3">
              {tableTitle}
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white dark:bg-gray-800">
            <td className="px-4 py-2">{titleRow1}</td>
            <td className=" bg-gray-500 text-white  text-center">
              {statusRow1}
            </td>
          </tr>

          <tr className="bg-white dark:bg-gray-800">
            <td className="px-4 py-2">{titleRow2}</td>
            <td className=" bg-gray-500 text-white p-4 text-center">
              {statusRow2}
            </td>
          </tr>

          <tr className="bg-white dark:bg-gray-800">
            <td className="px-4 py-2">{titleRow3}</td>
            <td className=" bg-gray-500 text-white p-4 text-center">
              {statusRow3}
            </td>
          </tr>

          <tr className="bg-white dark:bg-gray-800">
            <td className="px-4 py-2">{titleRow4}</td>
            <td className=" bg-gray-500 text-white p-4 text-center">
              {statusRow4}
            </td>
          </tr>

          <tr className="bg-white dark:bg-gray-800">
            <td className="px-4 py-2">{titleRow5}</td>
            <td className=" bg-gray-500 text-white p-4 text-center">
              {statusRow5}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
