import { Features } from "../components/audit/Features";
import { PieChartWithNeedle } from "../components/audit/PieChartWithNeedle";
import { ClientInfoItem } from "../components/audit/ClientInfoItem";
import { PieChartWithPaddingAngle } from "../components/audit/PieChartWithPaddingAngle";
import { PieChartWithPaddingAngleDouble } from "../components/audit/PieChartWithPaddingAngleDouble";
import { PieChartWithCustomizedLabel } from "../components/audit/PieChartWithCustomizedLabel";
import { CardItem } from "../components/audit/CardItem";
import { CardItemM } from "../components/audit/CardItemM";
import { TableItem } from "../components/audit/TableItem";
import svgIcon1 from "../img/1.svg";
import svgIcon2 from "../img/2.svg";
import svgIcon3 from "../img/3.svg";
import svgIcon4 from "../img/4.svg";

export const AddAudit = () => (
  <>
    <div class="grid grid-cols-6 items-start gap-2">
      {/* start col-1 */}
      <div class="grid gap-2">
        <div className="max-w-full max-h-full">
          <Features title="Security Risk Assessment" imgLink={svgIcon3} />
        </div>
        <div className="max-w-full max-h-full">
          <Features title="Password boss score" imgLink={svgIcon2} />
        </div>
        <div className="max-w-full max-h-full">
          <Features title="Microsoft Security Score" imgLink={svgIcon4} />
        </div>
      </div>
      {/* end col-1 */}

      {/* start col-2 */}
      <div class="grid gap-2">
        <div className="max-w-full max-h-full">
          <Features
            title="Cyber Essntials Certifiactions"
            subtitle="01/02/2024"
            imgLink={svgIcon1}
          />
        </div>
        <div className="max-w-full max-h-full">
          <Features title="Microsoft Security Score" imgLink={svgIcon4} />
        </div>
        <div className="max-w-full max-h-full"></div>
      </div>
      {/* end col-2 */}

      {/* start col-3 */}
      <div class="grid gap-2">
        <div className="max-w-full max-h-full">
          <Features title="Security Risk Assessment" imgLink={svgIcon3} />
        </div>
        <div className="max-w-full max-h-full">
          <Features title="Security Risk Assessment" imgLink={svgIcon3} />
        </div>
        <div className="max-w-full max-h-full">
          <Features title="Microsoft Security Score" imgLink={svgIcon4} />
        </div>
      </div>
      {/* end col-3 */}

      {/* start col-4 */}
      <div class="grid gap-2">
        <div className="max-w-full max-h-full">
          <Features
            title="Cyber Essntials Certifiactions"
            subtitle="01/02/2024"
            imgLink={svgIcon1}
          />
        </div>
        <div className="max-w-full max-h-full">
          <Features title="Security Risk Assessment" imgLink={svgIcon3} />
        </div>
        <div className="max-w-full max-h-full"></div>
      </div>
      {/* end col-4 */}
      <div class="grid gap-2">
        <div className="max-w-full max-h-full"></div>
        <div className="max-w-full max-h-full"></div>
        <div className="max-w-full max-h-full"></div>
      </div>
      <div class="grid gap-2">
        <div className="max-w-full max-h-full"></div>
        <div className="max-w-full max-h-full"></div>
        <div className="max-w-full max-h-full"></div>
      </div>
    </div>

    {/* client section start */}
    <h2 className="text-3xl mt-10">Client Score Card</h2>
    <div class="mt-5 bg-blue-700 h-px w-[80%]"></div>
    {/* row-1 start */}
    <div class="grid grid-cols-4 gap-4 mt-10">
      <div className=" ">
        <PieChartWithNeedle />
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
            Backup will give you a snapshot of how well your systems are backed
            up
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
        <ClientInfoItem title="Gold" subtitle="Constract Level" />
        <ClientInfoItem title="5" subtitle="Computers Covered" />
        <ClientInfoItem title="$100" subtitle="$Cloud/Hosting Cost" />
        <ClientInfoItem title="$175" subtitle="Contract Cost" />
      </div>
      <div className=" ">
        <PieChartWithNeedle />
      </div>
      <div className="">
        <PieChartWithNeedle />
      </div>
      <div className="">
        <PieChartWithNeedle />
      </div>
    </div>

    {/* client section end  */}

    {/* backup Backup start  */}

    <h2 className="text-3xl mt-10">Backup Scorecard</h2>
    <div class="mt-5 bg-blue-700 h-px w-[80%] my-5"></div>

    <div className="grid grid-cols-6 gap-2">
      {/* row-1 start */}
      <div className="col-span-2">
        <PieChartWithNeedle />
        <h3>Backup Scorecard</h3>
      </div>
      <div className="col-span-2">
        <TableItem />
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
          You can also see a full backup report of everything we are monitoring
          on the full reports including 30 day history.
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
        <PieChartWithNeedle />
      </div>
      <div className="">
        <PieChartWithCustomizedLabel />
      
      </div>

      <div className="">
        <PieChartWithPaddingAngleDouble />
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

    {/* row-2 start */}
    {/* <div className=" col-span-2">
        <h4 className="text-xl">Hardware and Software Lifecycle Audit</h4>
        <p className="mt-4">
          This report provides a scorecard summary for the overall backup
          protection level of your business, from here you can see what’s
          currently protected, what isn’t protected
        </p>
        <p className="mt-4">
          You can also see a full backup report of everything we are monitoring
          on the full reports including 30 day history.
        </p>
      </div>
      <div className=" col-span-2">
        <CardItem />
      </div>
      <div className=""></div>
      <div className=""></div> */}

    {/* row-2 end */}
  </>
);
