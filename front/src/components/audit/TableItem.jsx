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
    <div className="border border-solid border-grey rounded-md shadow-md">
      <table className="border-collapse border-slate-500 w-[100%] text-[12px] text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
          <tr className="bg-white border-blue-100 border-b border-t">
            <td className="px-4 py-2">{titleRow1}</td>
            <td
              className={`p-4 text-center text-white ${
                statusRow1 === "Unprotected" || statusRow1 === "Unmonitored"
                  ? "bg-red-500"
                  : statusRow1 === "Protected" || statusRow1 === "Monitored"
                    ? "bg-green-500"
                    : "bg-gray-500"
              }`}
            >
              {statusRow1}
            </td>
          </tr>

          <tr className="bg-white border-blue-100 border-b border-t">
            <td className="px-4 py-2">{titleRow2}</td>
            <td
              className={`p-4 text-center text-white ${
                statusRow2 === "Unprotected" || statusRow2 === "Unmonitored"
                  ? "bg-red-500"
                  : statusRow2 === "Protected" || statusRow2 === "Monitored"
                    ? "bg-green-500"
                    : "bg-gray-500"
              }`}
            >
              {statusRow2}
            </td>
          </tr>

          <tr className="bg-white border-blue-100 border-b border-t">
            <td className="px-4 py-2">{titleRow3}</td>
            <td
              className={`p-4 text-center text-white ${
                statusRow3 === "Unprotected" || statusRow3 === "Unmonitored"
                  ? "bg-red-500" || statusRow3 === "Monitored"
                  : statusRow3 === "Protected"
                    ? "bg-green-500"
                    : "bg-gray-500"
              }`}
            >
              {statusRow3}
            </td>
          </tr>

          <tr className="bg-white border-blue-100 border-b border-t">
            <td className="px-4 py-2">{titleRow4}</td>
            <td
              className={`p-4 text-center text-white ${
                statusRow4 === "Unprotected" || statusRow4 === "Unmonitored"
                  ? "bg-red-500" || statusRow4 === "Monitored"
                  : statusRow4 === "Protected"
                    ? "bg-green-500"
                    : "bg-gray-500"
              }`}
            >
              {statusRow4}
            </td>
          </tr>

          <tr className="bg-white border-blue-100  border-t-1">
            <td className="px-4 py-2">{titleRow5}</td>
            <td
              className={`p-4 text-center text-white ${
                statusRow5 === "Unprotected" ||
                statusRow5 === "Unmonitored" ||
                statusRow5 === "At risk"
                  ? "bg-red-500"
                  : statusRow5 === "Protected" ||
                      statusRow5 === "Monitored" ||
                      statusRow5 === "No risk"
                    ? "bg-green-500"
                    : "bg-gray-500"
              }`}
            >
              {statusRow5}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
