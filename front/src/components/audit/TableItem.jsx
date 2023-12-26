export const TableItem = () => {
  return (
    <div class="relative overflow-x-auto">
      <table class="w-[100%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Device Type
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white  dark:bg-gray-800 ">
            <td class="px-4 py-2">On Premis Server</td>
            <td class="px-4 py-2 bg-gray-500 text-white">N/A</td>
          </tr>
          <tr class="bg-white  dark:bg-gray-800 ">
            <td class="px-4 py-2 ">Online dedicated server</td>
            <td class="px-4 py-2  bg-green-600 text-white">Protected</td>
          </tr>
          <tr class="bg-white dark:bg-gray-800">
            <td class="px-4 py-2 ">Online an personal files</td>
            <td class="px-4 py-2 bg-green-600 text-white">Protected</td>
          </tr>
          <tr class="bg-white dark:bg-gray-800">
            <td class="px-4 py-2 ">Online file storage</td>
            <td class="px-4 py-2  bg-red-500 text-white">High Risk</td>
          </tr>
          <tr class="bg-white dark:bg-gray-800">
            <td class="px-4 py-2"> Personal Computers</td>
            <td class="px-4 py-2  bg-yellow-300 text-white">Unmonitored</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
