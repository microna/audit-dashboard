import React, { useState } from "react";

const statusColors = {
  "No risk": "bg-green-300",
  "Medium risk": "bg-yellow-300",
  "At risk": "bg-red-300",
  "N/a": "bg-gray-300",
};

export const TableDoubleItems = ({
  globalAdminRow1,
  globalAdminStatusRow1,
  adminStatusRow2,
  accountsRow2,
  adminStatusRow3,
  accountsRow3,
}) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-[100%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-3 py-3">
              Admin Accounts
            </th>
            <th scope="col" className="px-6 py-3">
              Accounts
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white dark:bg-gray-800">
            <td className="px-4 py-2">Global Admins in M365</td>
            <td className="px-4 py-2">{globalAdminRow1}</td>
            <td className="py-2 flex bg-yellow-300 text-white pl-4">
              {globalAdminStatusRow1}
            </td>
          </tr>

          <tr className="bg-white dark:bg-gray-800">
            <td className="px-4 py-2">Desktop admin access</td>
            <td className="px-4 py-2">{accountsRow2}</td>
            <td className="py-2 flex bg-yellow-300 text-white pl-4">
              {adminStatusRow2}
            </td>
          </tr>

          <tr className="bg-white dark:bg-gray-800">
            <td className="px-4 py-2">Server admin access</td>
            <td className="px-4 py-2">{accountsRow3}</td>
            <td className="py-2 flex bg-green-500 text-white pl-4">
              {adminStatusRow3}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
