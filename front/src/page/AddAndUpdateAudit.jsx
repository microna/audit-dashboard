import { useEffect, useState } from "react";
import axios from "../api";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useMyContext } from "../state/StateProvider";
import prepareGetOne from "../utils/prepareGetOne";
import { useForm } from "react-hook-form";

export const AddAndUpdateAudit = ({ action }) => {
  const contractTypeArr = ["Bronze", "Gold", "Platinum", "No contract"];
  const monitoredOptions = ["Unmonitored", "Monitored", "N/A"];
  const protectedOptions = ["Unprotected", "Protected", "N/A"];
  const riskOptions = ["At risk", "Medium Risk", "No risk", "N/A"];
  const [auditData, setAuditData] = useState(null);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      if (action === "create") {
        return;
      }
      const result = await getOne();
      return prepareGetOne(result);
    },
  });
  const { state } = useMyContext();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);

  const { id } = useParams();

  const isCreate = action === "create";
  const isUpdate = action === "update";

  const handleOnSubmitForm = async (body) => {
    console.log(body);
    try {
      setIsLoading(true);
      const backendUrl = process.env.REACT_APP_SERVER_URL;
      if (isCreate) {
        const result = await axios.post(backendUrl + "/audit", body);

        navigate("/audit/" + result.data.id, { replace: true });
      } else {
        const result = await axios.patch(backendUrl + "/audit/" + id, body);

        navigate("/audit/" + result.data.id, { replace: true });
      }
    } catch (err) {
      setError("root", { message: "Try again later" });
    } finally {
      setIsLoading(false);
    }
  };

  const getOne = async () => {
    try {
      const result = await axios.get(`/audit/${id}`);
      setAuditData(result.data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isCreate || window.location.pathname === "/add-audit") {
      reset({
        auditName: "",
      });
      setAuditData(null);
      console.log(window.location.pathname);
    }
  }, [navigate]);

  console.log(auditData);

  if (state.user && !state.user.isAdmin) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <>
      <form
        className="mt-5"
        action=""
        onSubmit={handleSubmit(handleOnSubmitForm)}
      >
        <label htmlFor="audit-name">Add new audit</label>
        <input
          defaultValue=""
          type="text"
          name="audit-name"
          placeholder="Type audit name here"
          className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
          {...register("auditName", {
            required: "this fiels is empty",
          })}
        />
        {errors?.auditName && (
          <div className="w-full mt-1 text-red-500 text-sm ">
            {errors.auditName.message}
          </div>
        )}

        <h2 className="text-3xl mt-10">Add Client Score Card</h2>
        <div className="my-4">
          <label className="block" htmlFor="overall-tech-health">
            Overall tech helth
          </label>
          <input
            type="number"
            name="overall-tech-health"
            id="overall-tech-health"
            {...register("overallTechHealth", {
              required: "this fiels is empty",
              max: {
                value: 100,
                message: "number should be lower than 100",
              },
              min: {
                value: 1,
                message: "number should be greater than 1",
              },
            })}
            className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
          />
          {errors?.overallTechHealth && (
            <div className="w-full mt-1 text-red-500 text-sm ">
              {errors.overallTechHealth.message}
            </div>
          )}
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
                className="w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("overallInformation")}
                selected={auditData?.overallInformation}
              >
                {auditData?.overallInformation && (
                  <option selected value={auditData?.overallInformation}>
                    {auditData?.overallInformation}
                  </option>
                )}
                {contractTypeArr
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.overallInformation;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>

            <label className=" block" htmlFor="">
              Computers Covered
            </label>
            <input
              type="number"
              name="computer-covered"
              className="mb-2 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              {...register("computerCovered", {
                required: "this fiels is empty",
              })}
            />
            {errors?.computerCovered && (
              <div className="w-full mt-1 text-red-500 text-sm ">
                {errors.computerCovered.message}
              </div>
            )}

            <label className="block" htmlFor="">
              Cloud/Hosting Cost
            </label>
            <input
              className="mb-2 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              type="number"
              name="hosting-cost"
              {...register("hostingCost", {
                required: "this fiels is empty",
              })}
            />
            {errors?.hostingCost && (
              <div className="w-full  text-red-500 text-sm ">
                {errors.hostingCost.message}
              </div>
            )}

            <label className="block" htmlFor="">
              Contract Cost
            </label>
            <input
              className="mb-2 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              type="number"
              name="contract-cost"
              {...register("contractCost", {
                required: "this fiels is empty",
              })}
            />
            {errors?.contractCost && (
              <div className="w-full mt-1 text-red-500 text-sm ">
                {errors.contractCost.message}
              </div>
            )}
          </div>
          <div className="my-4 w-[40%]">
            <label className="block" htmlFor="overall-backup-level">
              Overall backup level
            </label>
            <input
              id="overall-backup-level"
              type="number"
              name="overall-backup-level"
              className="mb-2 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              {...register("overallBackupLevel", {
                required: "this fiels is empty",
                max: {
                  value: 100,
                  message: "number should be lower than 100",
                },
                min: {
                  value: 1,
                  message: "number should be greater than 1",
                },
              })}
            />
            {errors?.overallBackupLevel && (
              <div className="w-full mt-1 text-red-500 text-sm ">
                {errors.overallBackupLevel.message}
              </div>
            )}

            <label className="block" htmlFor="overall-security-level">
              Overall Security Level
            </label>
            <input
              id="overall-security-level"
              type="number"
              name="overall-security-level"
              className="mb-2 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              {...register("overallSecurityLevel", {
                required: "this fiels is empty",
                max: {
                  value: 100,
                  message: "number should be lower than 100",
                },
                min: {
                  value: 1,
                  message: "number should be greater than 1",
                },
              })}
            />
            {errors?.overallSecurityLevel && (
              <div className="w-full mt-1 text-red-500 text-sm ">
                {errors.overallSecurityLevel.message}
              </div>
            )}

            <label className="block" htmlFor="overall-hardware-level">
              Overall Hardware/Software Health Level
            </label>
            <input
              id="overall-hardware-level"
              type="number"
              name="overall-hardware-level"
              className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              {...register("overallHardwareLevel", {
                required: "this fiels is empty",
                max: {
                  value: 100,
                  message: "number should be lower than 100",
                },
                min: {
                  value: 1,
                  message: "number should be greater than 1",
                },
              })}
            />
            {errors?.overallHardwareLevel && (
              <div className="w-full mt-1 text-red-500 text-sm ">
                {errors.overallHardwareLevel.message}
              </div>
            )}
          </div>
        </div>

        {/* backup scorecard section*/}
        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
          <div className="block w-[70%]">
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900  "
              >
                Online On Premise Servers
              </label>

              <select
                id="online-premise-servers-status"
                name="online-premise-servers-status"
                className="w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("onlinePremiseServersStatus")}
                selected={auditData?.onlinePremiseServersStatus}
              >
                {auditData?.onlinePremiseServersStatus && (
                  <option
                    selected
                    value={auditData?.onlinePremiseServersStatus}
                  >
                    {auditData?.onlinePremiseServersStatus}
                  </option>
                )}
                {monitoredOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.onlinePremiseServersStatus;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex items-center justify-between mb-5  gap-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Online Dedicated Servers
              </label>

              <select
                id="online-dedicated-servers-status"
                name="online-dedicated-servers-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("onlineDedicatedServersStatus")}
              >
                {auditData?.onlineDedicatedServersStatus && (
                  <option
                    selected
                    value={auditData?.onlineDedicatedServersStatus}
                  >
                    {auditData?.onlineDedicatedServersStatus}
                  </option>
                )}
                {protectedOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.onlineDedicatedServersStatus;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900  "
              >
                Email and Online Personal Files
              </label>
              <select
                id="email-online-personal-status"
                name="email-online-personal-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("emailOnlinePersonalStatus")}
              >
                {auditData?.emailOnlinePersonalStatus && (
                  <option selected value={auditData?.emailOnlinePersonalStatus}>
                    {auditData?.emailOnlinePersonalStatus}
                  </option>
                )}
                {protectedOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.emailOnlinePersonalStatus;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex items-center justify-between mb-5  gap-5">
              <label
                htmlFor="online-file-storage-status"
                className="block text-sm font-medium text-gray-900  "
              >
                Online File Storage
              </label>

              <select
                id="online-file-storage-status"
                name="online-file-storage-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("onlineFileStorageStatus")}
              >
                {auditData?.onlineFileStorageStatus && (
                  <option selected value={auditData?.onlineFileStorageStatus}>
                    {auditData?.onlineFileStorageStatus}
                  </option>
                )}
                {protectedOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.onlineFileStorageStatus;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor="personal-computer-status"
                className="block text-sm font-medium text-gray-900  "
              >
                Personal Computers
              </label>

              <select
                id="personal-computer-status"
                name=""
                className="w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("personalComputerStatus")}
                selected={auditData?.personalComputerStatus}
              >
                {auditData?.personalComputerStatus && (
                  <option selected value={auditData?.personalComputerStatus}>
                    {auditData?.personalComputerStatus}
                  </option>
                )}
                {monitoredOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.personalComputerStatus;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="block w-[70%]">
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor="file-test-recovery"
                className="block text-sm font-medium text-gray-900  "
              >
                Test File Recovery
              </label>

              <input
                id="file-test-recovery"
                name="file-test-recovery"
                type="date"
                className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5            "
                {...register("fileTestRecovery", {
                  required: "this fiels is empty",
                })}
              />
            </div>
            {errors?.fileTestRecovery && (
              <div className="w-full  px-1 text-red-500 text-sm text-right">
                {errors.fileTestRecovery.message}
              </div>
            )}

            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor="backup-success-rate"
                className="block text-sm font-medium text-gray-900"
              >
                Backup Success Rate
              </label>
              <input
                id="backup-success-rate"
                name="backup-success-rate"
                type="number"
                className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("backupSuccessRate", {
                  required: "this fiels is empty",
                  max: {
                    value: 100,
                    message: "number should be lower than 100",
                  },
                  min: {
                    value: 1,
                    message: "number should be greater than 1",
                  },
                })}
              />
            </div>

            {errors?.backupSuccessRate && (
              <div className="w-full mt-1 px-1 text-red-500 text-sm text-right">
                {errors.backupSuccessRate.message}
              </div>
            )}
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor="dr-status"
                className="block text-sm font-medium text-gray-900"
              >
                DR Status
              </label>

              <select
                id="dr-status"
                name="dr-status"
                className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("drStatus")}
                selected={auditData?.drStatus}
              >
                {auditData?.drStatus && (
                  <option selected value={auditData?.drStatus}>
                    {auditData?.drStatus}
                  </option>
                )}
                {riskOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.drStatus;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>

        {/* hardware scorecard section*/}
        <div className="grid gap-4 mb-4 sm:grid-cols-3 sm:gap-6 sm:mb-5">
          <div className="block w-[70%]">
            <label className="block" htmlFor="">
              The Digital Maturity Index
            </label>
            <input
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              type="number"
              name="digital-maturit-index"
              {...register("digitalMaturitIndex", {
                required: "this fiels is empty",
              })}
            />
            {errors?.digitalMaturitIndex && (
              <div className="w-full mt-1 text-red-500 text-sm">
                {errors.digitalMaturitIndex.message}
              </div>
            )}
            <label className="block" htmlFor="">
              Systems still within useful life
            </label>
            <input
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              type="number"
              name="hardware-system-support"
              {...register("hardwareSystemSupport", {
                required: "this fiels is empty",
              })}
            />
            {errors?.hardwareSystemSupport && (
              <div className="w-full mt-1 text-red-500 text-sm">
                {errors.hardwareSystemSupport.message}
              </div>
            )}
            <input
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              type="number"
              name="hardware-system-overdue"
              {...register("hardwareSystemOverdue", {
                required: "this fiels is empty",
              })}
            />
            {errors?.hardwareSystemOverdue && (
              <div className="w-full mt-1 text-red-500 text-sm">
                {errors.hardwareSystemOverdue.message}
              </div>
            )}
          </div>
          <div className="block w-[70%]">
            <label className="block" htmlFor="">
              All hardware assets in the report
            </label>
            <input
              placeholder="supported"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              type="number"
              name="hardware-assets-supported"
              {...register("hardwareAssetsSupported", {
                required: "this fiels is empty",
              })}
            />
            {errors?.hardwareAssetsSupported && (
              <div className="w-full mt-1 text-red-500 text-sm">
                {errors.hardwareAssetsSupported.message}
              </div>
            )}
            <input
              placeholder="unsupported soon"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              type="number"
              name="hardware-assets-unsupported-soon"
              {...register("hardwareAssetsUnsupportedSoon", {
                required: "this fiels is empty",
              })}
            />
            {errors?.hardwareAssetsUnsupportedSoon && (
              <div className="w-full mt-1 text-red-500 text-sm">
                {errors.hardwareAssetsUnsupportedSoon.message}
              </div>
            )}
            <input
              placeholder="unsupported"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              type="number"
              name="hardware-assets-unsupported"
              {...register("hardwareAssetsUnsupported", {
                required: "this fiels is empty",
              })}
            />
            {errors?.hardwareAssetsUnsupported && (
              <div className="w-full mt-1 text-red-500 text-sm">
                {errors.hardwareAssetsUnsupported.message}
              </div>
            )}
            <input
              placeholder="unknown"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              type="number"
              name="hardware-assets-unknown"
              {...register("hardwareAssetsUnknown", {
                required: "this fiels is empty",
              })}
            />
            {errors?.hardwareAssetsUnknown && (
              <div className="w-full mt-1 text-red-500 text-sm">
                {errors.hardwareAssetsUnknown.message}
              </div>
            )}
          </div>
          <div className="block w-[70%]">
            <label className="block" htmlFor="">
              Not installed
            </label>
            <input
              placeholder="supported"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              type="number"
              name="office-suite-supported"
              {...register("officeSuiteSupported", {
                required: "this fiels is empty",
              })}
            />
            {errors?.officeSuiteSupported && (
              <div className="w-full mt-1 text-red-500 text-sm">
                {errors.officeSuiteSupported.message}
              </div>
            )}
            <input
              placeholder="unsupported soon"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              type="number"
              name="office-suite-unsupported-soon"
              {...register("officeSuiteUnsupportedSoon", {
                required: "this fiels is empty",
              })}
            />
            {errors?.officeSuiteUnsupportedSoon && (
              <div className="w-full mt-1 text-red-500 text-sm">
                {errors.officeSuiteUnsupportedSoon.message}
              </div>
            )}
            <input
              placeholder="unsupported"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              type="number"
              name="office-suite-unsupported"
              {...register("officeSuiteUnsupported", {
                required: "this fiels is empty",
              })}
            />
            {errors?.officeSuiteUnsupported && (
              <div className="w-full mt-1 text-red-500 text-sm">
                {errors.officeSuiteUnsupported.message}
              </div>
            )}
            <input
              placeholder="unknown"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              type="number"
              name="office-suite-unknown"
              {...register("officeSuiteAssetsUnknown", {
                required: "this fiels is empty",
              })}
            />
            {errors?.officeSuiteAssetsUnknown && (
              <div className="w-full mt-1 text-red-500 text-sm">
                {errors.officeSuiteAssetsUnknown.message}
              </div>
            )}
          </div>

          {/* security scorecard */}
        </div>
        <div className="grid mb-4 gap-4 sm:grid-cols-2 sm:mb-5">
          <div className="block w-[100%]">
            <h3 className="text-xl my-10">Access Control Protection</h3>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900"
              >
                Multi factor authentication implemented
              </label>

              <select
                id="multi-factor-authentication"
                name="multi-factor-authentication"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("multiFactorAuthentication")}
                selected={auditData?.multiFactorAuthentication}
              >
                {auditData?.multiFactorAuthentication && (
                  <option selected value={auditData?.multiFactorAuthentication}>
                    {auditData?.multiFactorAuthentication}
                  </option>
                )}
                {protectedOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.multiFactorAuthentication;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex items-center justify-between mb-5  gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900"
              >
                Security training given to end users when onboarded/regularly
              </label>

              <select
                id="security-training-given"
                name="security-training-given"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("securityTrainingGiven")}
                selected={auditData?.securityTrainingGiven}
              >
                {auditData?.securityTrainingGiven && (
                  <option selected value={auditData?.securityTrainingGiven}>
                    {auditData?.securityTrainingGiven}
                  </option>
                )}
                {protectedOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.securityTrainingGiven;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900  "
              >
                Accounts audited, disabled and deleted – oldest password/account
              </label>

              <select
                id="accounts-audited"
                name="accounts-audited"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("accountsAudited")}
                selected={auditData?.accountsAudited}
              >
                {auditData?.accountsAudited && (
                  <option selected value={auditData?.accountsAudited}>
                    {auditData?.accountsAudited}
                  </option>
                )}
                {protectedOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.accountsAudited;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex items-center justify-between mb-5  gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900  "
              >
                Vulnerability Management Status
              </label>

              <select
                id="vulnerability-management"
                name="vulnerability-management"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("vulnerabilityManagement")}
                selected={auditData?.vulnerabilityManagement}
              >
                {auditData?.vulnerabilityManagement && (
                  <option selected value={auditData?.vulnerabilityManagement}>
                    {auditData?.vulnerabilityManagement}
                  </option>
                )}
                {protectedOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.vulnerabilityManagement;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900"
              >
                Mobile Device Management implemented & level of compliance
              </label>
              <select
                id="mobile-device-management"
                name="mobile-device-management"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("mobileDeviceManagement")}
                selected={auditData?.mobileDeviceManagement}
              >
                {auditData?.mobileDeviceManagement && (
                  <option selected value={auditData?.mobileDeviceManagement}>
                    {auditData?.mobileDeviceManagement}
                  </option>
                )}
                {protectedOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.mobileDeviceManagement;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="block w-[100%]">
            <h3 className="text-xl my-10">Protection Against Malware</h3>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900"
              >
                All computers up to date & running supported software
              </label>

              <select
                id="all-computers-up-to-date"
                name="all-computers-up-to-date"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("allComputersUpToDate")}
                selected={auditData?.allComputersUpToDate}
              >
                {auditData?.allComputersUpToDate && (
                  <option selected value={auditData?.allComputersUpToDate}>
                    {auditData?.allComputersUpToDate}
                  </option>
                )}
                {protectedOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.allComputersUpToDate;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex items-center justify-between mb-5  gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900"
              >
                All computers running anti-virus & ideally NextGen Anti-Virus
              </label>

              <select
                id="all-computers-running-anti-virus"
                name="all-computers-running-anti-virus"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("allComputersRunningAntiVirus")}
                selected={auditData?.allComputersRunningAntiVirus}
              >
                {auditData?.allComputersRunningAntiVirus && (
                  <option
                    selected
                    value={auditData?.allComputersRunningAntiVirus}
                  >
                    {auditData?.allComputersRunningAntiVirus}
                  </option>
                )}
                {protectedOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.allComputersRunningAntiVirus;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900"
              >
                Advance email protection with advanced malware & spam filtering
              </label>

              <select
                id="advance-email-protection-with-advanced-malware"
                name="advance-email-protection-with-advanced-malware"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("advanceEmailProtectionWithAdvancedMalware")}
                selected={auditData?.advanceEmailProtectionWithAdvancedMalware}
              >
                {auditData?.advanceEmailProtectionWithAdvancedMalware && (
                  <option
                    selected
                    value={auditData?.advanceEmailProtectionWithAdvancedMalware}
                  >
                    {auditData?.advanceEmailProtectionWithAdvancedMalware}
                  </option>
                )}
                {protectedOptions
                  .slice()
                  .filter((item) => {
                    return (
                      item !==
                      auditData?.advanceEmailProtectionWithAdvancedMalware
                    );
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex items-center justify-between mb-5  gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900"
              >
                Business files protected against attack including ransomware
              </label>

              <select
                id="business-files-protected"
                name="business-files-protected"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("businessFilesProtected")}
                selected={auditData?.businessFilesProtected}
              >
                {auditData?.businessFilesProtected && (
                  <option selected value={auditData?.businessFilesProtected}>
                    {auditData?.businessFilesProtected}
                  </option>
                )}
                {protectedOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.businessFilesProtected;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900"
              >
                AI implemented to look for suspicious file activity
              </label>

              <select
                id="ai-implemented"
                name="ai-implemented"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("aiImplemented")}
                selected={auditData?.aiImplemented}
              >
                {auditData?.aiImplemented && (
                  <option selected value={auditData?.aiImplemented}>
                    {auditData?.aiImplemented}
                  </option>
                )}
                {riskOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.aiImplemented;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>

          <div className="block w-[100%]">
            <h3 className="text-xl my-10">Admin Accounts</h3>

            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900"
              >
                Global Admins in M365
              </label>
              <input
                placeholder="Type Global Admins Name"
                className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                type="text"
                name="global-admins-names"
                {...register("globalAdminsNames")}
              />

              <select
                id="global-admins-names-status"
                name="global-admins-names-status"
                className="mb-5 w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("globalAdminsNamesStatus")}
                selected={auditData?.globalAdminsNamesStatus}
              >
                {auditData?.globalAdminsNamesStatus && (
                  <option selected value={auditData?.globalAdminsNamesStatus}>
                    {auditData?.globalAdminsNamesStatus}
                  </option>
                )}
                {riskOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.globalAdminsNamesStatus;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            {errors?.globalAdminsNames && (
              <div className="w-full mt-1 text-red-500 text-sm">
                {errors.globalAdminsNames.message}
              </div>
            )}
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900  "
              >
                Desktop admin access
              </label>
              <input
                placeholder="Type Desktop Admins Name"
                className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                type="text"
                name="desktop-admin-names"
                {...register("desktopAdminNames")}
              />

              <select
                id="desktop-admin-names-status"
                name="desktop-admin-names-status"
                className="mb-5 w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("desktopAdminNamesStatus")}
                selected={auditData?.desktopAdminNamesStatus}
              >
                {auditData?.desktopAdminNamesStatus && (
                  <option selected value={auditData?.desktopAdminNamesStatus}>
                    {auditData?.desktopAdminNamesStatus}
                  </option>
                )}
                {riskOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.desktopAdminNamesStatus;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            {errors?.desktopAdminNames && (
              <div className="w-full mt-1 text-red-500 text-sm">
                {errors.desktopAdminNames.message}
              </div>
            )}
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900"
              >
                Server admin access for
              </label>
              <input
                placeholder="Server Admin Name"
                className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                type="text"
                name="server-admin-names"
                {...register("serverAdminNames")}
              />

              <select
                id="server-admin-names-status"
                name="server-admin-names-status"
                className="mb-5 w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                {...register("serverAdminNamesStatus")}
                selected={auditData?.serverAdminNamesStatus}
              >
                {auditData?.serverAdminNamesStatus && (
                  <option selected value={auditData?.serverAdminNamesStatus}>
                    {auditData?.serverAdminNamesStatus}
                  </option>
                )}
                {riskOptions
                  .slice()
                  .filter((item) => {
                    return item !== auditData?.serverAdminNamesStatus;
                  })
                  .map((item, key) => {
                    return (
                      <option key={key} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            {errors?.serverAdminNamesStatus && (
              <div className="w-full mt-1 text-red-500 text-sm">
                {errors.serverAdminNamesStatus.message}
              </div>
            )}
            <div className="block w-[50%]">
              <div className="flex items-center justify-between mb-5 gap-5">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-900  "
                >
                  Lucidica Security Pro
                </label>
                <input
                  placeholder="Lucidica Security Pro"
                  className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                  type="date"
                  name="lucidica-security-pro"
                  {...register("lucidicaSecurityPro", {
                    required: "this fiels is empty",
                  })}
                />
              </div>
              {errors?.lucidicaSecurityPro && (
                <div className="w-full mt-1 text-red-500 text-sm">
                  {errors.lucidicaSecurityPro.message}
                </div>
              )}
              <div className="flex items-center justify-between mb-5 gap-5">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-900"
                >
                  Microsoft Secure Score
                </label>
                <input
                  placeholder="Lucidica Security Pro"
                  className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                  type="number"
                  name="microsoft-secure-score"
                  {...register("microsoftSecureScore", {
                    required: "this fiels is empty",
                  })}
                />
              </div>
              {errors?.microsoftSecureScore && (
                <div className="w-full mt-[-30px] text-red-500 text-sm">
                  {errors.microsoftSecureScore.message}
                </div>
              )}
            </div>
          </div>
        </div>
        {errors?.root && (
          <div className="w-full mt-1 text-red-500 text-sm ">
            {errors.root.message}
          </div>
        )}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
        >
          {isCreate && "Save Audit"}
          {isUpdate && "Update Audit"}
        </button>

        {loading && "Loading..."}
      </form>
    </>
  );
};
