import { useEffect, useState } from "react";
import axios from "../api";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useMyContext } from "../state/StateProvider";
import formatDate from "../utils/dateFormatter";
// import { contractTypeArr } from "./AddAudit";
import { useForm } from "react-hook-form";

export const AddAudit = ({ action }) => {
  const contractTypeArr = ["Bronze", "Gold", "Platinum", "No contract"];
  const [auditData, setAuditData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      if (action === "create") return;
      const result = await getOne();
      return {
        auditName: result.auditName,
        overallTechHealth: result.overallTechHealth,
        overallInformation: result.overallInformation,
        computerCovered: result.computerCovered,
        hostingCost: result.hostingCost,
        contractCost: result.contractCost,
        overallBackupLevel: result.overallBackupLevel,
        overallSecurityLevel: result.overallSecurityLevel,
        overallHardwareLevel: result.overallHardwareLevel,
        onlinePremiseServersStatus: result.onlinePremiseServersStatus,
        onlineFileStorageStatus: result.onlineFileStorageStatus,
        onlineDedicatedServersStatus: result.onlineDedicatedServersStatus,
        emailOnlinePersonalStatus: result.emailOnlinePersonalStatus,
        personalComputerStatus: result.personalComputerStatus,
        fileTestRecovery: formatDate(result.fileTestRecovery),
        backupSuccessRate: result.backupSuccessRate,
        drStatus: result.drStatus,
        hardwareSystemSupport: result.hardwareSystemSupport,
        hardwareSystemOverdue: result.hardwareSystemOverdue,
        digitalMaturitIndex: result.digitalMaturitIndex,
        hardwareAssetsSupported: result.hardwareAssetsSupported,
        hardwareAssetsUnsupportedSoon: result.hardwareAssetsUnsupportedSoon,
        hardwareAssetsUnsupported: result.hardwareAssetsUnsupported,
        hardwareAssetsUnknown: result.hardwareAssetsUnknown,
        officeSuiteSupported: result.officeSuiteSupported,
        officeSuiteUnsupportedSoon: result.officeSuiteUnsupportedSoon,
        officeSuiteUnsupported: result.officeSuiteUnsupported,
        officeSuiteAssetsUnknown: result.officeSuiteAssetsUnknown,
        multiFactorAuthentication: result.multiFactorAuthentication,
        securityTrainingGiven: result.securityTrainingGiven,
        accountsAudited: result.accountsAudited,
        vulnerabilityManagement: result.vulnerabilityManagement,
        mobileDeviceManagement: result.mobileDeviceManagement,
        allComputersUpToDate: result.allComputersUpToDate,
        allComputersRunningAntiVirus: result.allComputersRunningAntiVirus,
        advanceEmailProtectionWithAdvancedMalware:
          result.advanceEmailProtectionWithAdvancedMalware,
        businessFilesProtected: result.businessFilesProtected,
        aiImplemented: result.aiImplemented,
        globalAdminsNames: result.globalAdminsNames,
        globalAdminsNamesStatus: result.globalAdminsNamesStatus,
        desktopAdminNames: result.desktopAdminNames,
        desktopAdminNamesStatus: result.desktopAdminNamesStatus,
        serverAdminNames: result.serverAdminNames,
        serverAdminNamesStatus: result.serverAdminNamesStatus,
        lucidicaSecurityPro: formatDate(result.lucidicaSecurityPro),
        microsoftSecureScore: result.microsoftSecureScore,
      };
    },
  });
  const { state } = useMyContext();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);

  const { id } = useParams();

  const isCreate = action === "create";
  const isUpdate = action === "update";

  const handleOnSubmitForm = async ({
    auditName,
    overallTechHealth,
    overallInformation,
    computerCovered,
    hostingCost,
    contractCost,
    overallBackupLevel,
    overallSecurityLevel,
    overallHardwareLevel,
    onlinePremiseServersStatus,
    onlineFileStorageStatus,
    onlineDedicatedServersStatus,
    emailOnlinePersonalStatus,
    personalComputerStatus,
    fileTestRecovery,
    backupSuccessRate,
    drStatus,
    hardwareSystemSupport,
    hardwareSystemOverdue,
    digitalMaturitIndex,
    hardwareAssetsSupported,
    hardwareAssetsUnsupportedSoon,
    hardwareAssetsUnsupported,
    hardwareAssetsUnknown,
    officeSuiteSupported,
    officeSuiteUnsupportedSoon,
    officeSuiteUnsupported,
    officeSuiteAssetsUnknown,
    multiFactorAuthentication,
    securityTrainingGiven,
    accountsAudited,
    vulnerabilityManagement,
    mobileDeviceManagement,
    allComputersUpToDate,
    allComputersRunningAntiVirus,
    advanceEmailProtectionWithAdvancedMalware,
    businessFilesProtected,
    aiImplemented,
    globalAdminsNames,
    globalAdminsNamesStatus,
    desktopAdminNames,
    desktopAdminNamesStatus,
    serverAdminNames,
    serverAdminNamesStatus,
    lucidicaSecurityPro,
    microsoftSecureScore,
  }) => {
    const body = {
      auditName,
      overallTechHealth,
      overallInformation,
      computerCovered,
      hostingCost,
      contractCost,
      overallBackupLevel,
      overallSecurityLevel,
      overallHardwareLevel,
      onlinePremiseServersStatus,
      onlineFileStorageStatus,
      onlineDedicatedServersStatus,
      emailOnlinePersonalStatus,
      personalComputerStatus,
      fileTestRecovery,
      backupSuccessRate,
      drStatus,
      hardwareSystemSupport,
      hardwareSystemOverdue,
      digitalMaturitIndex,
      hardwareAssetsSupported,
      hardwareAssetsUnsupportedSoon,
      hardwareAssetsUnsupported,
      hardwareAssetsUnknown,
      officeSuiteSupported,
      officeSuiteUnsupportedSoon,
      officeSuiteUnsupported,
      officeSuiteAssetsUnknown,
      multiFactorAuthentication,
      securityTrainingGiven,
      accountsAudited,
      vulnerabilityManagement,
      mobileDeviceManagement,
      allComputersUpToDate,
      allComputersRunningAntiVirus,
      advanceEmailProtectionWithAdvancedMalware,
      businessFilesProtected,
      aiImplemented,
      globalAdminsNames,
      globalAdminsNamesStatus,
      desktopAdminNames,
      desktopAdminNamesStatus,
      serverAdminNames,
      serverAdminNamesStatus,
      lucidicaSecurityPro,
      microsoftSecureScore,
    };
    console.log(body);
    try {
      // const data = new FormData(event.target);
      // event.preventDefault();

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
      console.log(err);
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

  // useEffect(() => {
  //   getOne();
  // }, [id]);

  useEffect(() => {
    if (isCreate) setAuditData(null);
  }, [navigate]);

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
          type="text"
          name="audit-name"
          placeholder="Type audit name here"
          className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("auditName", {
            required: "this fiels is empty",
          })}
        />
        {errors?.auditName && (
          <div className="w-full mt-1 text-red-500 text-sm ">
            {errors.auditName.message}
          </div>
        )}

        <h2 className="text-3xl mt-10">Client Score Card</h2>
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
            className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                {...register("overallInformation", {
                  required: "this fiels is empty",
                })}
                id="overall-information"
                name="overall-information"
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
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("computerCovered", {
                required: "this fiels is empty",
              })}
            />

            <label className="block" htmlFor="">
              Cloud/Hosting Cost
            </label>
            <input
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="hosting-cost"
              {...register("hostingCost")}
            />

            <label className="block" htmlFor="">
              Contract Cost
            </label>
            <input
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="contract-cost"
              {...register("contractCost")}
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
              {...register("overallBackupLevel")}
            />
            <label className="block" htmlFor="overall-security-level">
              Overall Security Level
            </label>
            <input
              id="overall-security-level"
              type="number"
              name="overall-security-level"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("overallSecurityLevel")}
            />
            <label className="block" htmlFor="overall-hardware-level">
              Overall Hardware/Software Health Level
            </label>
            <input
              id="overall-hardware-level"
              type="number"
              name="overall-hardware-level"
              className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("overallHardwareLevel")}
            />
          </div>
        </div>

        {/* backup scorecard section*/}
        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
          <div className="block w-[70%]">
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Online On Premise Servers
              </label>
              <select
                id="online-premise-servers-status"
                name="online-premise-servers-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("onlinePremiseServersStatus")}
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-5  gap-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Online Dedicated Servers
              </label>
              <select
                id="online-dedicated-servers-status"
                name="online-dedicated-servers-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("onlineDedicatedServersStatus")}
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Email and Online Personal Files
              </label>
              <select
                id="email-online-personal-status"
                name="email-online-personal-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("emailOnlinePersonalStatus")}
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-5  gap-5">
              <label
                htmlFor="online-file-storage-status"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Online File Storage
              </label>
              <select
                id="online-file-storage-status"
                name="online-file-storage-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("onlineFileStorageStatus")}
              >
                <option value="N/A">Protected</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor="personal-computer-status"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Personal Computers
              </label>
              <select
                id="personal-computer-status"
                name="personal-computer-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("personalComputerStatus")}
              >
                <option value="Unmonitored">Unmonitored</option>
              </select>
            </div>
          </div>
          <div className="block w-[70%]">
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor="file-test-recovery"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Test File Recovery
              </label>

              <input
                id="file-test-recovery"
                name="file-test-recovery"
                type="date"
                className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("fileTestRecovery")}
              />
            </div>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor="backup-success-rate"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Backup Success Rate
              </label>
              <input
                id="backup-success-rate"
                name="backup-success-rate"
                type="number"
                className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("backupSuccessRate")}
              />
            </div>

            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor="dr-status"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                DR Status
              </label>
              <select
                id="dr-status"
                name="dr-status"
                className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("drStatus")}
              >
                <option value="At Risk">At Risk</option>
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
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="digital-maturit-index"
              {...register("digitalMaturitIndex")}
            />
            <label className="block" htmlFor="">
              Systems still within useful life
            </label>
            <input
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="hardware-system-support"
              {...register("hardwareSystemSupport")}
            />
            <input
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="hardware-system-overdue"
              {...register("hardwareSystemOverdue")}
            />
          </div>
          <div className="block w-[70%]">
            <label className="block" htmlFor="">
              All hardware assets in the report
            </label>
            <input
              placeholder="supported"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="hardware-assets-supported"
              {...register("hardwareAssetsSupported")}
            />
            <input
              placeholder="unsupported soon"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="hardware-assets-unsupported-soon"
              {...register("hardwareAssetsUnsupportedSoon")}
            />
            <input
              placeholder="unsupported"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="hardware-assets-unsupported"
              {...register("hardwareAssetsUnsupported")}
            />
            <input
              placeholder="unknown"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="hardware-assets-unknown"
              {...register("hardwareAssetsUnknown")}
            />
          </div>
          <div className="block w-[70%]">
            <label className="block" htmlFor="">
              Not installed
            </label>
            <input
              placeholder="supported"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="office-suite-supported"
              {...register("officeSuiteSupported")}
            />
            <input
              placeholder="unsupported soon"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="office-suite-unsupported-soon"
              {...register("officeSuiteUnsupportedSoon")}
            />
            <input
              placeholder="unsupported"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="office-suite-unsupported"
              {...register("officeSuiteUnsupported")}
            />
            <input
              placeholder="unknown"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="office-suite-unknown"
              {...register("officeSuiteAssetsUnknown")}
            />
          </div>

          {/* security scorecard */}
        </div>
        <div className="grid mb-4 gap-4 sm:grid-cols-2 sm:mb-5">
          <div className="block w-[100%]">
            <h3 className="text-xl my-10">Access Control Protection</h3>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Multi factor authentication implemented
              </label>
              <select
                id="multi-factor-authentication"
                name="multi-factor-authentication"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("multiFactorAuthentication")}
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-5  gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Security training given to end users when onboarded/regularly
              </label>
              <select
                id="security-training-given"
                name="security-training-given"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("securityTrainingGiven")}
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Accounts audited, disabled and deleted – oldest password/account
              </label>
              <select
                id="accounts-audited"
                name="accounts-audited"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("accountsAudited")}
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-5  gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Vulnerability Management Status
              </label>
              <select
                id="vulnerability-management"
                name="vulnerability-management"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("vulnerabilityManagement")}
              >
                <option value="N/A">Protected</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Mobile Device Management implemented & level of compliance
              </label>
              <select
                id="mobile-device-management"
                name="mobile-device-management"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("mobileDeviceManagement")}
              >
                <option value="Unmonitored">Unmonitored</option>
              </select>
            </div>
          </div>
          <div className="block w-[100%]">
            <h3 className="text-xl my-10">Protection Against Malware</h3>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                All computers up to date & running supported software
              </label>
              <select
                id="all-computers-up-to-date"
                name="all-computers-up-to-date"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("allComputersUpToDate")}
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-5  gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                All computers running anti-virus & ideally NextGen Anti-Virus
              </label>
              <select
                id="all-computers-running-anti-virus"
                name="all-computers-running-anti-virus"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("allComputersRunningAntiVirus")}
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Advance email protection with advanced malware & spam filtering
              </label>
              <select
                id="advance-email-protection-with-advanced-malware"
                name="advance-email-protection-with-advanced-malware"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("advanceEmailProtectionWithAdvancedMalware")}
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-5  gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Business files protected against attack including ransomware
              </label>
              <select
                id="business-files-protected"
                name="business-files-protected"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("businessFilesProtected")}
              >
                <option value="N/A">Protected</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                AI implemented to look for suspicious file activity
              </label>
              <select
                id="ai-implemented"
                name="ai-implemented"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("aiImplemented")}
              >
                <option value="Unmonitored">Unmonitored</option>
              </select>
            </div>
          </div>

          <div className="block w-[100%]">
            <h3 className="text-xl my-10">Admin Accounts</h3>

            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Global Admins in M365
              </label>
              <input
                placeholder="Type Global Admins Name"
                className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="global-admins-names"
                {...register("globalAdminsNames")}
              />
              <select
                id="global-admins-names-status"
                name="global-admins-names-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("globalAdminsNamesStatus")}
              >
                <option value="Medium Risk">Medium Risk</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Desktop admin access
              </label>
              <input
                placeholder="Type Desktop Admins Name"
                className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="desktop-admin-names"
                {...register("desktopAdminNames")}
              />
              <select
                id="desktop-admin-names-status"
                name="desktop-admin-names-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("desktopAdminNamesStatus")}
              >
                <option value="Medium Risk">Medium Risk</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Server admin access for
              </label>
              <input
                placeholder="Server Admin Name"
                className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="server-admin-names"
                {...register("serverAdminNames")}
              />
              <select
                id="server-admin-names-status"
                name="server-admin-names-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("serverAdminNamesStatus")}
              >
                <option value="Medium Risk">Medium Risk</option>
              </select>
            </div>
            <div className="block w-[50%]">
              <div className="flex items-center justify-between mb-5 gap-5">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Lucidica Security Pro
                </label>
                <input
                  placeholder="Lucidica Security Pro"
                  className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="date"
                  name="lucidica-security-pro"
                  {...register("lucidicaSecurityPro")}
                />
              </div>
              <div className="flex items-center justify-between mb-5 gap-5">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Microsoft Secure Score
                </label>
                <input
                  placeholder="Lucidica Security Pro"
                  className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  name="microsoft-secure-score"
                  {...register("microsoftSecureScore")}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {isCreate && "Save Audit"}
          {isUpdate && "Update Audit"}
        </button>

        {loading && "Loading..."}
      </form>
    </>
  );
};
