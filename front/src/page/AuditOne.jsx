import axios from "../api";
import formatDate from "../utils/dateFormatter";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PieChartWithNeedle } from "../components/audit/PieChartWithNeedle";
import { ClientInfoItem } from "../components/audit/ClientInfoItem";
import { CardItem } from "../components/audit/CardItem";
import { PieChartWithPaddingAngle } from "../components/audit/PieChartWithPaddingAngle";
import { CardItemM } from "../components/audit/CardItemM";
import { TableItem } from "../components/audit/TableItem";
import { PieChartWithCustomizedLabel } from "../components/audit/PieChartWithCustomizedLabel";
import { SoftwareAssets } from "../components/audit/SoftwareAsset";
import { Features } from "../components/audit/Features";
import { TableDoubleItems } from "../components/audit/TableDoubleItems";
import svgIcon1 from "../img/1.svg";
import svgIcon2 from "../img/2.svg";
import svgIcon3 from "../img/3.svg";
import svgIcon4 from "../img/4.svg";

export const AuditOne = () => {
  const { id } = useParams();
  const [auditData, setAuditData] = useState(null);

  const getOne = async () => {
    try {
      const result = await axios.get(`/audit/${id}`);
      setAuditData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOne();
  }, [id]);
  if (!auditData) {
    return <>Loading</>;
  }
  return (
    <>
      {/* {auditData.auditName} */}
      <h2 className="text-3xl mt-10">Client Scorcard</h2>
      <div className="mt-5 bg-blue-700 h-px w-[80%]"></div>

      <div className="grid grid-cols-4 gap-4 mt-10">
        <div className=" ">
          <PieChartWithNeedle
            componentData={auditData.overallTechHealth}
            title="Overall Tech Health"
          />
        </div>
        <div className="col-span-3">
          <h3 className="text-xl">Overall Tech Health</h3>
          <p className="text-gray-500">
            This report provides a quick snapshot of the overall tech health of
            your business. We have split your tech health into 4 areas that are
            assessed and updated regularly
          </p>
          <ul className="list-disc text-gray-500">
            <li className="ml-5 mb-3 mt-3">
              Backup will give you a snapshot of how well your systems are
              backed up
            </li>
            <li className="ml-5 mb-3">
              Security will give you a snapshot of how secure your systems are
              against attack
            </li>
            <li className="ml-5 mb-3">
              Hardware/software will give you a snapshot of how up to date your
              systems are
            </li>
            <li className="ml-5 mb-3">
              Data protection will let you know how compliant you are with
              legislation like GDPR
            </li>
          </ul>

          <p className="text-gray-500">
            Please find more details of each area in the following reports
          </p>
        </div>
        <div className=" ">
          <ClientInfoItem>
            <p className="text-gray-500">Contract Level</p>
            <h5 className="text-l font-semibold">
              <p>{auditData.overallInformation}</p>
            </h5>
          </ClientInfoItem>
          <ClientInfoItem>
            <p className="text-gray-500">Computers Covered</p>
            <h5 className="text-l font-semibold">
              <p>{auditData.computerCovered}</p>
            </h5>
          </ClientInfoItem>
          <ClientInfoItem>
            <p className="text-gray-500">Cloud/hosting cost</p>
            <h5 className="text-l font-semibold">
              <p>£{auditData.hostingCost}</p>
            </h5>
          </ClientInfoItem>
          <ClientInfoItem>
            <p className="text-gray-500">Contract Cost</p>
            <h5 className="text-l font-semibold">
              <p>£{auditData.contractCost}</p>
            </h5>
          </ClientInfoItem>
        </div>
        <div className=" ">
          <PieChartWithNeedle
            componentData={auditData.overallBackupLevel}
            title="Overall Backup Health"
          />
        </div>
        <div className="">
          <PieChartWithNeedle
            componentData={auditData.overallSecurityLevel}
            title="Overall Security Level"
          />
        </div>
        <div className="">
          <PieChartWithNeedle
            componentData={auditData.overallHardwareLevel}
            title="Overall Hardware/Software Health"
          />
        </div>
      </div>
      {/* backup Backup start  */}

      <h2 className="text-3xl mt-10">Backup Scorecard</h2>
      <div className="mt-5 bg-blue-700 h-px w-[80%] my-5"></div>

      <div className="grid grid-cols-6 gap-2">
        {/* row-1 start */}
        <div className="col-span-2 ">
          <PieChartWithNeedle
            title="Overall Backup Level"
            componentData={auditData.overallBackupLevel}
          />
        </div>

        <div className="col-span-2">
          <TableItem
            tableTitle="Device Type"
            statusRow1={auditData.onlinePremiseServersStatus}
            statusRow2={auditData.onlineDedicatedServersStatus}
            statusRow3={auditData.emailOnlinePersonalStatus}
            statusRow4={auditData.onlineFileStorageStatus}
            statusRow5={auditData.personalComputerStatus}
            titleRow1="On Premise Servers"
            titleRow2="Online Dedicated Servers"
            titleRow3="Email and Online Personal Files"
            titleRow4="Online File Storage"
            titleRow5="Personal Computers"
          />
        </div>

        <div className=" ">
          <PieChartWithPaddingAngle
            componentData={auditData.backupSuccessRate}
          />
        </div>
        <div className=" ">
          <CardItemM auditData={auditData} />
        </div>
        {/* row-1 end */}

        {/* row-2 start */}
        <div className=" col-span-2">
          <h4 className="text-xl">Backup </h4>
          <p className="mt-4">
            This report provides a scorecard summary for the overall backup
            protection level of your business, from here you can see what’s
            currently protected, what isn’t protected
          </p>
          <p className="mt-4">
            You can also see a full backup report of everything we are
            monitoring on the full reports including 30 day history.
          </p>
        </div>
        <div className=" col-span-2">
          <CardItem auditData={auditData} />
        </div>
        <div className=""></div>
        <div className=""></div>
      </div>
      {/* row-2 end */}

      <h2 className="text-3xl mt-10"> Hardware Scorecard</h2>
      <div className="mt-5 bg-blue-700 h-px w-[80%] my-5"></div>

      <div className="grid grid-cols-3 gap-2">
        {/* row-1 start */}
        <div className="">
          <PieChartWithNeedle
            componentData={auditData.overallHardwareLevel}
            title="Overall Hardware/Software Health"
          />
        </div>
        <div className="">
          <PieChartWithCustomizedLabel />
          <div className="flex justify-around">
            <div className="flex items-center">
              <span className="inline-block w-8 h-8 bg-customBlue"></span>
              <p className="ml-5">Supported</p>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-8 h-8 bg-customRed"></span>
              <p className="ml-5">Overdue</p>
            </div>
          </div>
          <h3 className="text-center mt-7">Systems still within useful life</h3>
        </div>

        <div className="">
          <div className="flex">
            <SoftwareAssets
              title="All hardware assets in this report"
              componentDataSupported={auditData.hardwareAssetsSupported}
              componentDataUnsupportedSoon={
                auditData.hardwareAssetsUnsupportedSoon
              }
              componentDataUnsupported={auditData.hardwareAssetsUnsupported}
              componentDataUnknown={auditData.hardwareAssetsUnknown}
            />
            <SoftwareAssets
              title="Not Installed in 28"
              componentDataSupported={auditData.officeSuiteSupported}
              componentDataUnsupportedSoon={
                auditData.officeSuiteUnsupportedSoon
              }
              componentDataUnsupported={auditData.officeSuiteUnsupported}
              componentDataUnknown={auditData.officeSuiteAssetsUnknown}
            />
          </div>
        </div>
        {/* row-1 end */}

        {/* row-2 start */}
        <div className="">
          <h4 className="text-xl">Hardware & Software Lifecycle Audit </h4>
          <p className="mt-4">
            This report provides a scorecard summary for how up to date your
            various systems are both in terms of the age of the equipment and
            whether it is still in warranty along with whether they are running
            any unsupported software or operating systems.
          </p>
        </div>
        <div className="">{/* <PieChartWithNeedle /> */}</div>
      </div>
      {/* row-2end */}

      {/* hardware scorecard  end  */}

      {/* security scorecard start  */}
      <h2 className="text-3xl mt-10"> Security Scorecard</h2>
      <div className="mt-5 bg-blue-700 h-px w-[80%] my-5"></div>

      {/* row-1 start */}
      <div className="grid grid-cols-3 gap-2">
        <div className="">
          <PieChartWithNeedle
            componentData={auditData.overallSecurityLevel}
            title="Overall Security Level"
          />
          <p className="mt-4">
            This report provides a scorecard summary for how up to date your IT
            security is. We assess your systems for internal and external
            vulnerabilities.
          </p>
          <p className="mt-4">
            We generally recommend clients to undertake ‘Cyber Essentials’ and
            also take out a ‘Lucidica Security Pro’ package, achieving this UK
            Government backed security mark and implementing the technology
            included in the Lucidica package will place your business in the top
            5% of UK businesses for IT security and could provide a reduced IT
            security insurance premium.
          </p>
        </div>
        <div className="">
          <TableItem
            tableTitle="Access Control Protection"
            statusRow1={auditData.multiFactorAuthentication}
            statusRow2={auditData.securityTrainingGiven}
            statusRow3={auditData.accountsAudited}
            statusRow4={auditData.vulnerabilityManagement}
            statusRow5={auditData.mobileDeviceManagement}
            titleRow1="Multi factor authentication implemented Protected"
            titleRow2="Security training given to end users when onboarded/regularly"
            titleRow3="Accounts audited, disabled and deleted –oldest password/account"
            titleRow4="Vulnerability Management Status"
            titleRow5="Mobile Device Management implemented & level of compliance"
          />

          <div className="grid grid-cols-2 gap-2">
            <Features
              title="Lucidica Security Pro"
              imgLink={svgIcon1}
              featureData={formatDate(auditData.lucidicaSecurityPro)}
            />
            <Features
              title="Microsoft Secure Score"
              imgLink={svgIcon2}
              featureData={auditData.microsoftSecureScore}
            />
          </div>
        </div>
        <div className="">
          <div className="grid gap-2">
            <TableItem
              tableTitle="Protection Against Malware"
              statusRow1={auditData.allComputersUpToDate}
              statusRow2={auditData.allComputersRunningAntiVirus}
              statusRow3={auditData.advanceEmailProtectionWithAdvancedMalware}
              statusRow4={auditData.businessFilesProtected}
              statusRow5={auditData.aiImplemented}
              titleRow1="All computers up to date & running supported
              software"
              titleRow2="All computers running anti-virus & ideally NextGen
              Anti-Virus"
              titleRow3="Advance email protection with advanced malware &
              spam filtering"
              titleRow4="Business files protected against attack including
              ransomware"
              titleRow5="AI implemented to look for suspicious file activity Protected"
            />
            <TableDoubleItems
              globalAdminRow1={auditData.globalAdminsNames}
              globalAdminStatusRow1={auditData.globalAdminsNamesStatus}
              accountsRow2={auditData.desktopAdminNames}
              adminStatusRow2={auditData.desktopAdminNamesStatus}
              accountsRow3={auditData.serverAdminNames}
              adminStatusRow3={auditData.serverAdminNamesStatus}
            />
          </div>
        </div>
      </div>

      {/* security scorecard end  */}
    </>
  );
};
