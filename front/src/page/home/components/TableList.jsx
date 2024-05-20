import axios from "../../../api";
import { Navigate, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import formatDate from "../../../utils/dateFormatter";

export const TableList = () => {
  const [obj, setObj] = useState(null);
  const navigate = useNavigate();

  const getItems = async () => {
    try {
      const result = await axios.get("/audit");
      setObj(result.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getItems();
  }, []);


  return (
    <div className="pt-10 overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-4">
              Document name
            </th>
            <th scope="col" className="px-4 py-3">
              Category
            </th>
            <th scope="col" className="px-4 py-3">
              Company
            </th>

            <th scope="col" className="px-4 py-3">
              Date
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {obj &&
            obj.map((item) => {
              return (
                <tr
                  onClick={() => {}}
                  key={item._id}
                  className="border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="cursor-pointer px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    onClick={() => {
                      navigate("audit/" + item._id);
                    }}
                  >
                    {item.auditName}
                  </th>
                  <td className="px-4 py-3">Audit</td>
                  <td className="px-4 py-3">[Lucidica]</td>
                  <td className="px-4 py-3">{formatDate(item.createdAt)}</td>

                  {/* <td className="px-4 py-3">{item.timestamps}</td> */}
                  <td className="px-4 py-3 flex items-center justify-end">
                    <Dropdown label="Settings" dismissOnClick={false}>
                      <Dropdown.Item
                        onClick={() => navigate("update-audit/" + item._id)}
                      >
                        Edit
                      </Dropdown.Item>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
