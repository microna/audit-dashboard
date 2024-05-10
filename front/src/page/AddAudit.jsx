import { useState } from "react";
import axios from "../api";
import { Navigate, useNavigate } from "react-router-dom";

const CustomSelect = ({ children, id, name }) => {
  return (
    <select
      required
      id={id}
      name={name}
      className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {children}
    </select>
  );
};

export const AddAudit = () => {
  const navigate = useNavigate();

  const options = {};
  const [loading, setIsLoading] = useState(false);
  const handleOnSubmitForm = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.target);
      const body = {
        auditName: data.get("audit-name"),
        overallTechHealth: data.get("overall-tech-health"),
        overallInformation: data.get("overall-information"),
        computerCovered: data.get("computer-covered"),
        hostingCost: data.get("hosting-cost"),
        contractCost: data.get("contract-cost"),
        overallBackupLevel: data.get("overall-backup-level"),
        overallSecurityLevel: data.get("overall-security-level"),
        overallHardwareLevel: data.get("overall-hardware-level"),
        onlinePremiseServersStatus: data.get("online-premise-servers-status"),
        onlineFileStorageStatus: data.get("online-file-storage-status"),
        onlineDedicatedServersStatus: data.get(
          "online-dedicated-servers-status"
        ),
        emailOnlinePersonalStatus: data.get("email-online-personal-status"),
        personalComputerStatus: data.get("personal-computer-status"),
        fileTestRecovery: data.get("file-test-recovery"),
        backupSuccessRate: data.get("backup-success-rate"),
        drStatus: data.get("dr-status"),
        hardwareSystemSupport: data.get("hardware-system-support"),
        hardwareSystemOverdue: data.get("hardware-system-overdue"),
        digitalMaturitIndex: data.get("digital-maturit-index"),
        hardwareAssetsSupported: data.get("hardware-assets-supported"),
        hardwareAssetsUnsupportedSoon: data.get(
          "hardware-assets-unsupported-soon"
        ),
        hardwareAssetsUnsupported: data.get("hardware-assets-unsupported"),
        hardwareAssetsUnknown: data.get("hardware-assets-unknown"),
        officeSuiteSupported: data.get("office-suite-supported"),
        officeSuiteUnsupportedSoon: data.get("office-suite-unsupported-soon"),
        officeSuiteUnsupported: data.get("office-suite-unsupported"),
        officeSuiteAssetsUnknown: data.get("office-suite-unknown"),
        multiFactorAuthentication: data.get("multi-factor-authentication"),
        securityTrainingGiven: data.get("security-training-given"),
        accountsAudited: data.get("accounts-audited"),
        vulnerabilityManagement: data.get("vulnerability-management"),
        mobileDeviceManagement: data.get("mobile-device-management"),
        allComputersUpToDate: data.get("all-computers-up-to-date"),
        allComputersRunningAntiVirus: data.get(
          "all-computers-running-anti-virus"
        ),
        advanceEmailProtectionWithAdvancedMalware: data.get(
          "advance-email-protection-with-advanced-malware"
        ),
        businessFilesProtected: data.get("business-files-protected"),
        aiImplemented: data.get("ai-implemented"),
      };
      const result = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/audit",
        body
      );
      console.log(result);
      setIsLoading(false);
      navigate("/audit/" + result.data.id, { replace: true });
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
          required
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
            required
            type="number"
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
              <CustomSelect id="overall-information" name="overall-information">
                <option value="Bronze">Bronze</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
                <option value="No contract">No contract</option>
              </CustomSelect>
            </div>

            <label className=" block" htmlFor="">
              Computers Covered
            </label>
            <input
              required
              type="number"
              name="computer-covered"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <label className="block" htmlFor="">
              Cloud/Hosting Cost
            </label>
            <input
              required
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="hosting-cost"
            />

            <label className="block" htmlFor="">
              Contract Cost
            </label>
            <input
              required
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
              required
              id="overall-backup-level"
              type="number"
              name="overall-backup-level"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label className="block" htmlFor="overall-security-level">
              Overall Security Level
            </label>
            <input
              required
              id="overall-security-level"
              type="number"
              name="overall-security-level"
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label className="block" htmlFor="overall-hardware-level">
              Overall Hardware/Software Health Level
            </label>
            <input
              required
              id="overall-hardware-level"
              type="number"
              name="overall-hardware-level"
              className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        {/* backup scorecard section*/}
        <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
          <div className="block w-[70%]">
            <div class="flex items-center justify-between mb-5 gap-5">
              <label
                for="name"
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Online On Premise Servers
              </label>
              <select
                required
                id="online-premise-servers-status"
                name="online-premise-servers-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div class="flex items-center justify-between mb-5  gap-5">
              <label
                for="name"
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Online Dedicated Servers
              </label>
              <select
                required
                id="online-dedicated-servers-status"
                name="online-dedicated-servers-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div class="flex items-center justify-between mb-5 gap-5">
              <label
                for="name"
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Email and Online Personal Files
              </label>
              <select
                required
                id="email-online-personal-status"
                name="email-online-personal-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div class="flex items-center justify-between mb-5  gap-5">
              <label
                for="online-file-storage-status"
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Online File Storage
              </label>
              <select
                required
                id="online-file-storage-status"
                name="online-file-storage-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="N/A">Protected</option>
              </select>
            </div>
            <div class="flex items-center justify-between mb-5 gap-5">
              <label
                for="personal-computer-status"
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Personal Computers
              </label>
              <select
                required
                id="personal-computer-status"
                name="personal-computer-status"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Unmonitored">Unmonitored</option>
              </select>
            </div>
          </div>
          <div className="block w-[70%]">
            <div class="flex items-center justify-between mb-5 gap-5">
              <label
                for="file-test-recovery"
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Test File Recovery
              </label>
              <input
                id="file-test-recovery"
                name="file-test-recovery"
                type="date"
                className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="flex items-center justify-between mb-5 gap-5">
              <label
                for="backup-success-rate"
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Backup Success Rate
              </label>
              <input
                required
                id="backup-success-rate"
                name="backup-success-rate"
                type="number"
                className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div class="flex items-center justify-between mb-5 gap-5">
              <label
                htmlFor="dr-status"
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                DR Status
              </label>
              <select
                required
                id="dr-status"
                name="dr-status"
                className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Protected">At Risk</option>
              </select>
            </div>
          </div>
        </div>

        {/* hardware scorecard section*/}
        <div class="grid gap-4 mb-4 sm:grid-cols-3 sm:gap-6 sm:mb-5">
          <div className="block w-[70%]">
            <label className="block" htmlFor="">
              The Digital Maturity Index{" "}
            </label>
            <input
              required
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="digital-maturit-index"
            />
            <label className="block" htmlFor="">
              Systems still within useful life
            </label>
            <input
              required
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="hardware-system-support"
            />
            <input
              required
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="hardware-system-overdue"
            />
          </div>
          <div className="block w-[70%]">
            <label className="block" htmlFor="">
              All hardware assets in the report
            </label>
            <input
              placeholder="supported"
              required
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="hardware-assets-supported"
            />
            <input
              placeholder="unsupported soon"
              required
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="hardware-assets-unsupported-soon"
            />
            <input
              placeholder="unsupported"
              required
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="hardware-assets-unsupported"
            />
            <input
              placeholder="unknown"
              required
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="hardware-assets-unknown"
            />
          </div>
          <div className="block w-[70%]">
            <label className="block" htmlFor="">
              Not installed
            </label>
            <input
              placeholder="supported"
              required
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="office-suite-supported"
            />
            <input
              placeholder="unsupported soon"
              required
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="office-suite-unsupported-soon"
            />
            <input
              placeholder="unsupported"
              required
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="office-suite-unsupported"
            />
            <input
              placeholder="unknown"
              required
              className="mb-5 w-[50%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="office-suite-unknown"
            />
          </div>

          {/* security scorecard */}
        </div>
        <div class="grid mb-4 gap-4 sm:grid-cols-2 sm:mb-5">
          <div className="block w-[100%]">
            <div class="flex items-center justify-between mb-5 gap-5">
              <label
                for=""
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Multi factor authentication implemented
              </label>
              <select
                required
                id="multi-factor-authentication"
                name="multi-factor-authentication"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div class="flex items-center justify-between mb-5  gap-5">
              <label
                for=""
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Security training given to end users when onboarded/regularly
              </label>
              <select
                required
                id="security-training-given"
                name="security-training-given"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div class="flex items-center justify-between mb-5 gap-5">
              <label
                for=""
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Accounts audited, disabled and deleted – oldest password/account
              </label>
              <select
                required
                id="accounts-audited"
                name="accounts-audited"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div class="flex items-center justify-between mb-5  gap-5">
              <label
                for=""
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Vulnerability Management Status
              </label>
              <select
                required
                id="vulnerability-management"
                name="vulnerability-management"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="N/A">Protected</option>
              </select>
            </div>
            <div class="flex items-center justify-between mb-5 gap-5">
              <label
                for=""
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Mobile Device Management implemented & level of compliance
              </label>
              <select
                required
                id="mobile-device-management"
                name="mobile-device-management"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Unmonitored">Unmonitored</option>
              </select>
            </div>
          </div>
          <div className="block w-[100%]">
            <div class="flex items-center justify-between mb-5 gap-5">
              <label
                for=""
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                All computers up to date & running supported software
              </label>
              <select
                required
                id="all-computers-up-to-date"
                name="all-computers-up-to-date"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div class="flex items-center justify-between mb-5  gap-5">
              <label
                for=""
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                All computers running anti-virus & ideally NextGen Anti-Virus
              </label>
              <select
                required
                id="all-computers-running-anti-virus"
                name="all-computers-running-anti-virus"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div class="flex items-center justify-between mb-5 gap-5">
              <label
                for=""
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Advance email protection with advanced malware & spam filtering
              </label>
              <select
                required
                id="advance-email-protection-with-advanced-malware"
                name="advance-email-protection-with-advanced-malware"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Protected">Protected</option>
              </select>
            </div>
            <div class="flex items-center justify-between mb-5  gap-5">
              <label
                for=""
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Business files protected against attack including ransomware
              </label>
              <select
                required
                id="business-files-protected"
                name="business-files-protected"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="N/A">Protected</option>
              </select>
            </div>
            <div class="flex items-center justify-between mb-5 gap-5">
              <label
                for=""
                class="block text-sm font-medium text-gray-900 dark:text-white"
              >
                AI implemented to look for suspicious file activity
              </label>
              <select
                required
                id="ai-implemented"
                name="ai-implemented"
                className=" w-[30%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Unmonitored">Unmonitored</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid my-4 sm:grid-cols-2 sm:mb-5"></div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save Audit{" "}
        </button>
      </form>
    </>
  );
};
