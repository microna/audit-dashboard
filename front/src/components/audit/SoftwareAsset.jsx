import { FaComputer } from "react-icons/fa6";

export const SoftwareAssets = () => {
  return (
    <>
      <div class="w-full bg-blue-100 p-4 rounded-lg shadow-md flex items-center justify-between my-3">
        <div className="text-left">
          <FaComputer size={40} />
          <h3 className="font-bold pb-3">OS</h3>
          <h4 className="">
            <input className="w-[50px] text-black" type="text" />
          </h4>
          <p className="text-xs text-gray-500 pb-3">Software updates</p>
          <p>All hardware assets in this report</p>
          <p className="text-green-600 text-xs pb-3">
            <input className="w-[50px] text-black" type="text" /> Supported
          </p>
          <p className=" text-yellow-300 text-xs pb-3">
            <input className="w-[50px] text-black" type="text" /> Unsupported
            Soon
          </p>
          <p className="text-red-600 text-xs pb-3">
            <input className="w-[50px] text-black" type="text" /> Unsupported
          </p>
          <p className="text-xs">
            <input className="w-[50px] text-black" type="text" />
            Unknown
          </p>
        </div>
      </div>
    </>
  );
};
