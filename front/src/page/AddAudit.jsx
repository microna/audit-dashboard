import { useState } from "react";
import axios from "axios";

export const AddAudit = () => {
  const options = {};
  const [loading, setIsLoading] = useState(false);
  const handleOnSubmitForm = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.target);
      const body = {
        auditName: data.get("audit-name"),
      };
      const result = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/audit",
        body
      );
      console.log(result);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <form className="mt-5" action="" onSubmit={handleOnSubmitForm}>
        <label htmlFor="audit-name">Add new audit</label>
        <input
          type="text"
          name="audit-name"
          placeholder="Type audit name here"
          className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <h2 className="text-3xl mt-10">Client Score Card</h2>
        <div className="my-4">
          <label className="block" htmlFor="overall-tech-health">
            Overall tech helth
          </label>
          <input
            type="text"
            name="overall-tech-health"
            id="overall-tech-health"
            className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="flex items-start flex-start">
          <div className="my-4 w-[40%]">
            <div className="block">
              <label className="block" htmlFor="overall-information">
                Overall information
              </label>
              <select
                id="overall-information"
                name="overall-information"
                className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Bronze">Bronze</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
                <option value="No contract">No contract</option>
              </select>
            </div>

            <label className=" block" htmlFor="">
              Computers Covered
            </label>
            <input
              type="number"
              name="computer-covered"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <label className="block" htmlFor="">
              Cloud/Hosting Cost
            </label>
            <input
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="hosting-cost"
            />

            <label className="block" htmlFor="">
              Contract Cost
            </label>
            <input
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="contract-cost"
            />
          </div>
          <div className="my-4 w-[40%]">
            <label className="block" htmlFor="overall-backup-level">
              Overall backup level
            </label>
            <input
              id="overall-backup-level"
              type="number"
              name="overall-backup-level"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label className="block" htmlFor="overall-security-level">
              Overall Security Level
            </label>
            <input
              id="overall-security-level"
              type="number"
              name="overall-security-level"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label className="block" htmlFor="overall-hardware-level">
              Overall Hardware/Software Health Level
            </label>
            <input
              id="overall-hardware-level"
              type="number"
              name="overall-hardware-level"
              className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <button
          //   onClick={handleSubmitBtn}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save Audit{" "}
        </button>
      </form>
    </>
  );
};
