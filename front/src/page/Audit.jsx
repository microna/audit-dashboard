import { Features } from "../components/audit/Features";
import { PieChartWithNeedle } from "../components/audit/PieChartWithNeedle";
import { ClientInfoItem } from "../components/audit/ClientInfoItem";
import { PieChartWithPaddingAngle } from "../components/audit/PieChartWithPaddingAngle";
import { SoftwareAssets } from "../components/audit/SoftwareAsset";
import { PieChartWithCustomizedLabel } from "../components/audit/PieChartWithCustomizedLabel";
import { CardItem } from "../components/audit/CardItem";
import { CardItemM } from "../components/audit/CardItemM";
import { TableItem } from "../components/audit/TableItem";
import svgIcon1 from "../img/1.svg";
import svgIcon2 from "../img/2.svg";
import svgIcon3 from "../img/3.svg";
import svgIcon4 from "../img/4.svg";
import { useState } from "react";
import axios from "axios";

export const Audit = () => {
  const [loading, setIsLoading] = useState(false);
  const handleOnSubmitForm = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      console.log(formData.get("techHealth"));
      const body = {
        techHealth: formData.get("techHealth"),
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
      {/* client section start */}
      <h2 className="text-3xl mt-10">Client Score Card</h2>
      <div class="mt-5 bg-blue-700 h-px w-[80%]"></div>
      {/* row-1 start */}
      <div class="grid grid-cols-4 gap-4 mt-10">
        <div className=" ">
          <PieChartWithNeedle id="techHealth" title="Overall Tech Health" />
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
        {/* row-1 end */}

        <div className=" ">
          <ClientInfoItem title="Contract Level" data="Gold" />
          <ClientInfoItem title="Computers Covered" data="5" />
          <ClientInfoItem title="Cloud/Hosting Cost" data="£100" />
          <ClientInfoItem title="Contract Cost" data="£175" />
        </div>
        <div className=" ">
          <PieChartWithNeedle title="Overall Backup Health" />
        </div>
        <div className="">
          <PieChartWithNeedle title="Overall Security Health" />
        </div>
        <div className="">
          <PieChartWithNeedle title="Overall Hardware/Software Health" />
        </div>
      </div>

      {/* client section end  */}

      {/* backup Backup start  */}

      <h2 className="text-3xl mt-10">Backup Scorecard</h2>
      <div class="mt-5 bg-blue-700 h-px w-[80%] my-5"></div>

      <div className="grid grid-cols-6 gap-2">
        {/* row-1 start */}
        <div className="col-span-2">
          <PieChartWithNeedle title="Overall Backup Level" />
          <h3>Backup Scorecard</h3>
        </div>
        <div className="col-span-2">
          <TableItem rowCount={5} title="Device Type" />
        </div>
        <div className=" ">
          <PieChartWithPaddingAngle />
          {/* <h4>30 Day Backup succes rate</h4> */}
        </div>
        <div className=" ">
          <CardItemM />
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
          <CardItem />
        </div>
        <div className=""></div>
        <div className=""></div>
      </div>
      {/* row-2 end */}

      <h2 className="text-3xl mt-10"> Hardware Scorecard</h2>
      <div class="mt-5 bg-blue-700 h-px w-[80%] my-5"></div>

      <div className="grid grid-cols-3 gap-2">
        {/* row-1 start */}
        <div className="">
          <PieChartWithNeedle title="Overall Hardware/Software Level" />
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
            <SoftwareAssets />
            <SoftwareAssets />
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
        <div className="">
          <PieChartWithNeedle />
        </div>
      </div>
      {/* row-2end */}

      {/* hardware scorecard  end  */}

      {/* security scorecard start  */}
      <h2 className="text-3xl mt-10"> Security Scorecard</h2>
      <div class="mt-5 bg-blue-700 h-px w-[80%] my-5"></div>

      {/* row-1 start */}
      <div className="grid grid-cols-3 gap-2">
        <div className="">
          <PieChartWithNeedle title="Overall Security Level" />
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
          <TableItem title="Access Control Protection" rowCount={5} />
          <div className="grid grid-cols-2 gap-2">
            <Features title="Microsoft Security Score" imgLink={svgIcon4} />
            <Features title="Microsoft Security Score" imgLink={svgIcon4} />
          </div>
        </div>
        <div className="">
          <TableItem title="Protection Against Malaware" rowCount={5} />
          <div className="grid grid-cols-2 gap-2">
            <Features title="Password boss score" imgLink={svgIcon2} />
            <Features title="Password boss score" imgLink={svgIcon2} />
          </div>
        </div>
      </div>

      {/* security scorecard end  */}
    </>
  );
};
