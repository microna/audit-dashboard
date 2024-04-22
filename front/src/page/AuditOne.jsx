import axios from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PieChartWithNeedle } from "../components/audit/PieChartWithNeedle";
import { ClientInfoItem } from "../components/audit/ClientInfoItem";

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
      <div class="mt-5 bg-blue-700 h-px w-[80%]"></div>

      <div class="grid grid-cols-4 gap-4 mt-10">
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
            <p class="text-gray-500">Contract Level</p>
            <h5 class="text-l font-semibold">
              <p>{auditData.overallInformation}</p>
            </h5>
          </ClientInfoItem>
          <ClientInfoItem>
            <p class="text-gray-500">Computers Covered</p>
            <h5 class="text-l font-semibold">
              <p>{auditData.computerCovered}</p>
            </h5>
          </ClientInfoItem>
          <ClientInfoItem>
            <p class="text-gray-500">Cloud/hosting cost</p>
            <h5 class="text-l font-semibold">
              <p>£{auditData.hostingCost}</p>
            </h5>
          </ClientInfoItem>
          <ClientInfoItem>
            <p class="text-gray-500">Contract Cost</p>
            <h5 class="text-l font-semibold">
              <p>£{auditData.contractCost}</p>
            </h5>
          </ClientInfoItem>
        </div>
        <div className=" ">
          <PieChartWithNeedle
            componentData={auditData.overallBackupLevel}
            title="Overall Backup Level"
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
    </>
  );
};
