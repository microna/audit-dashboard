import React, { useState } from "react";

const statusColors = {
  "No risk": "bg-green-300",
  "Medium risk": "bg-yellow-300",
  "At risk": "bg-red-300",
  "N/a": "bg-gray-300",
};

export const TableItem = ({ componentData }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-[100%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-3 py-3">
              Device type
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white dark:bg-gray-800">
            <td className="px-4 py-2">On Premise Servers</td>
            <td className="py-2 flex bg-gray-500 text-white pl-4">
              {componentData.onlinePremiseServersStatus}
            </td>
          </tr>

          <tr className="bg-white dark:bg-gray-800">
            <td className="px-4 py-2">Online Dedicated Servers</td>
            <td className="py-2 flex bg-gray-500 text-white pl-4">
              {componentData.onlinePremiseServersStatus}
            </td>
          </tr>

          <tr className="bg-white dark:bg-gray-800">
            <td className="px-4 py-2">Email and Online Personal Files</td>
            <td className="py-2 flex bg-gray-500 text-white pl-4">
              {componentData.emailOnlinePersonalStatus}
            </td>
          </tr>

          <tr className="bg-white dark:bg-gray-800">
            <td className="px-4 py-2">Online File Storage</td>
            <td className="py-2 flex bg-gray-500 text-white pl-4">
              {componentData.onlineFileStorageStatus}
            </td>
          </tr>

          <tr className="bg-white dark:bg-gray-800">
            <td className="px-4 py-2">Personal Computers</td>
            <td className="py-2 flex bg-gray-500 text-white pl-4">
              {componentData.personalComputerStatus}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
